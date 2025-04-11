const db = require("../../connection/connection");

saveShipping = async (req, res) => {
    const { user_id, address, city, state, country, zip_code, phone_number } = req.body;

    try {
        const [result] = await db.query(
            "INSERT INTO shipping (user_id, address, city, state, country, zip_code, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [user_id, address, city, state, country, zip_code, phone_number]
        );
        res.status(201).json({ message: "Shipping saved", shippingId: result.insertId });
    } catch (error) {
        console.error("Error saving shipping:", error);
        res.status(500).json({ error: "Failed to save shipping" });
    }
}; 


module.exports = {saveShipping}