const db = require("../../connection/Connection");



const getAllProduct = (req, res) => {
    const sql = "SELECT * FROM products"
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ err: "Internal Server Error..." })
        }
        return res.status(200).json(results)
    })
}


module.exports = {
    getAllProduct,
}