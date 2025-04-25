// const path = require("path");
// const db = require("../../connection/connection");
// const cloudinary = require("cloudinary").v2;

// const getCategories = (req, res) => {
//   db.query("SELECT * FROM categories ORDER BY id ASC", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(result.rows);
//     }
//   });
// };

// const addCategory = (req, res) => {
//   const title = req.body.title;
//   const image = req.file ? req.file.path : null; // ✅ NOT .filename
//   console.log("categoryImage", req.file)

//   const q = "INSERT INTO categories (image, title, status) VALUES ($1, $2, $3)";
//   const values = [image, title, "active"];

//   db.query(q, values, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({err : "Error adding category"});
//     } else {
//       res.status(201).json({message : "Category added successfully"});
//     }
//   });
// };

// const updateCategory = async (req, res) => {
//   const id = req.params.id;
//   const { title } = req.body;
//   const newImage = req.file ? req.file.path : null;  // Cloudinary URL

//   const selectQuery = "SELECT image FROM categories WHERE id = $1";
//   db.query(selectQuery, [id], async (err, data) => {
//     if (err) return res.status(500).json({ message: "Database Error" });

//     const oldImageUrl = data.rows[0]?.image;

//     if (newImage && oldImageUrl) {
//       // Extract the folder name and file name from the old image URL
//       const urlParts = oldImageUrl.split("/");
//       const folder = urlParts[urlParts.length - 2]; // "categoryImage"
//       const fileName = urlParts[urlParts.length - 1].split(".")[0]; // "abc123"
//       const publicId = `${folder}/${fileName}`;

//       try {
//         await cloudinary.uploader.destroy(publicId);
//         console.log("Old image deleted:", publicId);
//       } catch (err) {
//         console.error("Cloudinary deletion error:", err);
//       }
//     }

//     // Update category with the new image or keep the old image
//     const updateQuery = "UPDATE categories SET title = $1, image = $2 WHERE id = $3";
//     const values = [title, newImage || oldImageUrl, id];

//     db.query(updateQuery, values, (err) => {
//       if (err) return res.status(500).json({ message: "Error updating category" });
//       return res.json({ message: "Category updated successfully" });
//     });
//   });
// };


// const getCategoryById = (req, res) => {
//   const id = req.params.id;
//   const q = "SELECT * FROM categories WHERE id =$1";
//   db.query(q, [id], (err, result) => {
//     if (err) {
//       return res.status(500);
//     }
//     return res.json(result.rows);
//   });
// };



// const deleteCategory = (req, res) => {
//   const id = req.params.id;

//   // Fetch the products associated with the category
//   const selectProductImages = "SELECT image FROM products WHERE category_id = $1";
//   db.query(selectProductImages, [id], (err, productData) => {
//     if (err) return res.status(500).json({ message: "Error fetching product images" });

//     productData.rows.forEach((product) => {
//       if (product.image) {
//         // Extract public_id for the product image and delete from Cloudinary
//         const urlParts = product.image.split("/");
//         const folder = urlParts[urlParts.length - 2]; // "productImage"
//         const fileName = urlParts[urlParts.length - 1].split(".")[0]; // "abc123"
//         const publicId = `${folder}/${fileName}`;

//         cloudinary.uploader.destroy(publicId, (err) => {
//           if (err) console.error("Error deleting product image:", err);
//         });
//       }
//     });

//     // Fetch the category image
//     const selectImage = "SELECT image FROM categories WHERE id = $1";
//     db.query(selectImage, [id], (err, data) => {
//       if (err) return res.status(500).json({ message: "Database Error" });

//       const imageUrl = data.rows[0]?.image;
//       if (imageUrl) {
//         // Extract public_id for the category image and delete from Cloudinary
//         const urlParts = imageUrl.split("/");
//         const folder = urlParts[urlParts.length - 2]; // "categoryImage"
//         const fileName = urlParts[urlParts.length - 1].split(".")[0]; // "abc123"
//         const publicId = `${folder}/${fileName}`;

//         cloudinary.uploader.destroy(publicId, (err) => {
//           if (err) console.error("Error deleting category image:", err);
//         });
//       }

//       // Proceed with category deletion from the database
//       const deleteQuery = "DELETE FROM categories WHERE id = $1";
//       db.query(deleteQuery, [id], (err) => {
//         if (err) return res.status(500).json({ message: "Error deleting category" });

//         return res.status(200).json({ message: "Category deleted successfully" });
//       });
//     });
//   });
// };



// module.exports = { getCategories, addCategory, deleteCategory, updateCategory, getCategoryById };


const path = require("path");
const db = require("../../connection/connection");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getCategories = (req, res) => {
  db.query("SELECT * FROM categories ORDER BY id ASC", (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err.message, err.stack);
      return res.status(500).json({ error: "Error fetching categories" });
    }
    res.json(result.rows);
  });
};

const addCategory = async (req, res) => {
  const title = req.body.title;
  let imageUrl = null;

  // Input validation
  if (!title) {
    console.error("Missing title in request body");
    return res.status(400).json({ error: "Title is required" });
  }

  // Handle image upload
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "categoryImage",
        resource_type: "image",
      });
      imageUrl = result.secure_url;
      console.log("Cloudinary upload successful:", imageUrl);
    } catch (err) {
      console.error("Cloudinary upload error:", err.message, err.stack);
      return res.status(500).json({ error: "Error uploading image to Cloudinary" });
    }
  } else {
    console.warn("No image provided in request");
  }

  const query = `
    INSERT INTO categories (image, title, status, created_at, updated_at)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING id
  `;
  const values = [imageUrl, title, "active"];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error adding category:", err.message, err.stack);
      return res.status(500).json({ error: "Error adding category to database", details: err.message });
    }
    console.log(`Category added successfully, ID: ${result.rows[0].id}`);
    res.status(201).json({ message: "Category added successfully", categoryId: result.rows[0].id });
  });
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  let newImage = null;

  // Input validation
  if (!title) {
    console.error("Missing title in request body");
    return res.status(400).json({ error: "Title is required" });
  }

  // Handle image upload
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "categoryImage",
        resource_type: "image",
      });
      newImage = result.secure_url;
      console.log("Cloudinary upload successful:", newImage);
    } catch (err) {
      console.error("Cloudinary upload error:", err.message, err.stack);
      return res.status(500).json({ error: "Error uploading image to Cloudinary" });
    }
  }

  const selectQuery = "SELECT image FROM categories WHERE id = $1";
  db.query(selectQuery, [id], async (err, data) => {
    if (err) {
      console.error("Database error fetching category:", err.message, err.stack);
      return res.status(500).json({ error: "Database error" });
    }

    const oldImageUrl = data.rows[0]?.image;

    if (newImage && oldImageUrl) {
      try {
        const urlParts = oldImageUrl.split("/");
        const folder = urlParts[urlParts.length - 2];
        const fileName = urlParts[urlParts.length - 1].split(".")[0];
        const publicId = `${folder}/${fileName}`;
        await cloudinary.uploader.destroy(publicId);
        console.log("Old image deleted:", publicId);
      } catch (err) {
        console.error("Cloudinary deletion error:", err.message, err.stack);
      }
    }

    const updateQuery = `
      UPDATE categories
      SET title = $1, image = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
    `;
    const values = [title, newImage || oldImageUrl, id];

    db.query(updateQuery, values, (err) => {
      if (err) {
        console.error("Database error updating category:", err.message, err.stack);
        return res.status(500).json({ error: "Error updating category", details: err.message });
      }
      console.log(`Category updated successfully, ID: ${id}`);
      res.json({ message: "Category updated successfully" });
    });
  });
};

const getCategoryById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM categories WHERE id = $1";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching category by ID:", err.message, err.stack);
      return res.status(500).json({ error: "Error fetching category" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(result.rows[0]);
  });
};

const deleteCategory = (req, res) => {
  const id = req.params.id;

  const selectProductImages = "SELECT image FROM products WHERE category_id = $1";
  db.query(selectProductImages, [id], (err, productData) => {
    if (err) {
      console.error("Error fetching product images:", err.message, err.stack);
      return res.status(500).json({ error: "Error fetching product images" });
    }

    productData.rows.forEach((product) => {
      if (product.image) {
        const urlParts = product.image.split("/");
        const folder = urlParts[urlParts.length - 2];
        const fileName = urlParts[urlParts.length - 1].split(".")[0];
        const publicId = `${folder}/${fileName}`;
        cloudinary.uploader.destroy(publicId, (err) => {
          if (err) console.error("Error deleting product image:", err.message);
        });
      }
    });

    const selectImage = "SELECT image FROM categories WHERE id = $1";
    db.query(selectImage, [id], (err, data) => {
      if (err) {
        console.error("Database error fetching category image:", err.message, err.stack);
        return res.status(500).json({ error: "Database error" });
      }

      const imageUrl = data.rows[0]?.image;
      if (imageUrl) {
        const urlParts = imageUrl.split("/");
        const folder = urlParts[urlParts.length - 2];
        const fileName = urlParts[urlParts.length - 1].split(".")[0];
        const publicId = `${folder}/${fileName}`;
        cloudinary.uploader.destroy(publicId, (err) => {
          if (err) console.error("Error deleting category image:", err.message);
        });
      }

      const deleteQuery = "DELETE FROM categories WHERE id = $1";
      db.query(deleteQuery, [id], (err) => {
        if (err) {
          console.error("Database error deleting category:", err.message, err.stack);
          return res.status(500).json({ error: "Error deleting category", details: err.message });
        }
        console.log(`Category deleted successfully, ID: ${id}`);
        res.status(200).json({ message: "Category deleted successfully" });
      });
    });
  });
};

module.exports = { getCategories, addCategory, deleteCategory, updateCategory, getCategoryById };