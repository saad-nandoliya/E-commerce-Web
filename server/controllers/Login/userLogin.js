const db = require("../../connection/Connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

//  ===================== SIGN UP ======================= //
const registerNewUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "Username, email, and password are required." });
        }


        const checkEmail = "SELECT * FROM `users` WHERE username = ? OR email = ?"
        db.query(checkEmail, [username, email], async (err, result) => {
            if (err) {
                console.error("Database error:", err.message);
                return res.status(500).json({ message: "Database error. Try again later." });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "Username Or Email already exists. Try another one!" });
            }


            const hashPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                [username, email, hashPassword],
                (err, data) => {
                    if (err) {
                        console.error("Database Insert Error:", err);
                        return res.status(500).json({ message: "Database error occurred" });
                    }

                    return res
                        .status(201)
                        .json({ message: "User registered successfully" });
                }
            );
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
};

//  ===================== LOGIN ======================= //
const loginClientUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const q = "SELECT * FROM users WHERE email = ?";
        db.query(q, [email], async (err, result) => {
            if (err) {
                console.error("Database Query Error:", err);
                return res.status(500).json({ message: "Database error occurred" });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = result[0];

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, username: user.username },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    picture: user.picture || "https://i.pravatar.cc/100"
                }
            });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
};



//  ===================== GOOGLE LOGIN ======================= //
const googleSignup = async (req, res) => {
    try {
        const { google_id, email, username, picture } = req.body;


        const checkEmail = "SELECT * FROM `users` WHERE username = ? OR email = ?"
        db.query(checkEmail, [username, email], async (err, result) => {
            if (err) {
                console.error("Database error:", err.message);
                return res.status(500).json({ message: "Database error. Try again later." });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "Username Or Email already exists. Try another one!" });
            }

            db.query(
                "SELECT * FROM users WHERE google_id = ?",
                [google_id],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Database error occurred" });
                    }

                    if (result.length > 0) {
                        const user = result[0];
                        const token = jwt.sign(
                            { id: user.id, email: user.email },
                            SECRET_KEY,
                            { expiresIn: "1h" }
                        );
                        return res.status(200).json({ message: "Login successful", token });
                    } else {
                        db.query(
                            "INSERT INTO users (google_id, username, email, picture) VALUES (?, ?, ?, ?)",
                            [google_id, username, email, picture],
                            (err, data) => {
                                if (err) {
                                    return res
                                        .status(500)
                                        .json({ message: "Database error occurred" });
                                }

                                const token = jwt.sign({ id: data.insertId, email }, SECRET_KEY, {
                                    expiresIn: "1h",
                                });
                                return res
                                    .status(201)
                                    .json({ message: "Google Signup Successful!", token });
                            }
                        );
                    }
                }
            );
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
};

module.exports = { registerNewUser, loginClientUser, googleSignup };
