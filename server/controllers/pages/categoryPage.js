const db = require("../../connection/Connection");

const getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const addCategory = (req, res) => {
  const title = req.body.title;
  const image = req.file ? req.file.filename : null;

  const q = "INSERT INTO categories (image, title) VALUES (?, ?)";
  const values = [image, title];

  db.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error adding category");
    } else {
      res.status(201).send("Category added successfully");
    }
  });
};

const updateCategory = (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const image = req.file ? req.file.filename : req.body.image || null;
  const q = "UPDATE categories SET title =? , image=? WHERE id =?";
  const values = [title, image, id];
  db.query(q, values, (err, result) => {
    if (err) {
      return res.status(500);
    }
    return res.json(result);
  });
};

const getCategoryById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM categories WHERE id =?";
  db.query(q, id, (err, result) => {
    if (err) {
      return res.status(500);
    }
    return res.json(result);
  });
};

const deleteCategory = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM categories WHERE id =?";
  db.query(q, id, (err, result) => {
    if (err) {
      return res.status(500);
    }
    return res.json(200);
  });
};

module.exports = { getCategories, addCategory, deleteCategory, updateCategory,getCategoryById };