const path = require("path");
const db = require("../../connection/connection");
const cloudinary = require("cloudinary").v2;

const getAllProducts = (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, result) => {
    if (err) {
      return res.status(500);
    }
    return res.json(result.rows);
  });
};



const getProductsById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM products WHERE id =$1";
  db.query(q, id, (err, result) => {
    if (err) {
      return res.status(500);
    }
    return res.json(result.rows);
  });
};

const addProducts = (req, res) => {
  const { name, price, description, category_id } = req.body;
  const image = req.file ? req.file.filename : null;

  const q =
    "INSERT INTO products (name, price, description, image, status,  category_id) VALUES ($1, $2, $3, $4, $5, $6)";

  const values = [name, price, description, image, "active", category_id];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({message: "Product added successfully",});
  });
};

const updateProducts = (req, res) => {
  const id = req.params.id;
  const { name, price, description, category_id } = req.body;
  const newImage = req.file ? req.file.filename : null;

  const selectQuery = "SELECT image FROM products WHERE id = $1";
  db.query(selectQuery, [id], (err, data) => {
    if (err) return res.status(500).json({ message: "Database Error" });

    const oldImageUrl = data.rows[0]?.image;

    if (newImage && oldImageUrl) {
      const publicId = oldImageUrl.split("/").pop().split(".")[0];
      cloudinary.uploader.destroy(`productImage/${publicId}`, (err) => {
        if (err) console.error("Error deleting old image from Cloudinary:", err);
      });
    }


    const updateQuery = "UPDATE products SET name =$1, price =$2, description =$3, category_id=$4, image=$5 WHERE id =$6";
    const values = [name, price, description, category_id, newImage || oldImageUrl, id];
    db.query(updateQuery, values, (err, result) => {
      if (err) return res.status(500).json({ message: "Error updating product" });

      return res.json({ message: "Product updated successfully", result });
    });
  });
};



const deleteProducts = (req, res) => {
  const id = req.params.id;
  const selectImage = "SELECT image FROM products WHERE id = $1";
  db.query(selectImage, [id], (err, data) => {
    if (err) return res.status(500).json({ message: "Database Error" });

    const imageUrl = data.rows[0]?.image;
    if (imageUrl) {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      cloudinary.uploader.destroy(`productImage/${publicId}`, (err) => {
        if (err) console.error("Error deleting product image from Cloudinary:", err);
      });
    }

    const q = "DELETE FROM products WHERE id =$1";
    db.query(q, id, (err, result) => {
      if (err) {
        return res.status(500);
      }
      return res.json(200);
    });
  });
};

const getProductsByCategory = (req, res) => {
  const category = req.params.id;
  const q = "SELECT * FROM products WHERE category_id = $1";
  db.query(q, [category], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result.rows);
    }
  });
};



const updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = "UPDATE products SET status = $1 WHERE id = $2";
  db.query(query, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ message: "Products status updated successfully!" });
  });
};


module.exports = {
  getAllProducts,
  getProductsById,
  addProducts,
  updateProducts,
  deleteProducts,
  getProductsByCategory,
  updateStatus,
};