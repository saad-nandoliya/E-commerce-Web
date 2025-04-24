const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()

const db = require("./connection/connection")
const userLogin = require("./routes/loginRoute/userLoginRoute")
const adminUser = require("./routes/loginRoute/adminLoginRoute")
const product = require("./routes/pagesRoute/productPageRoute")
const category = require("./routes/pagesRoute/categoryRoutePage")
const CartItem = require("./routes/pagesRoute/cartItemRoutePage")
const paymentRoutes = require("./routes/paymentRoute/paymentRoute");
const webhookRoutes = require("./routes/paymentRoute/webhookRoutes");

const app = express()
const PORT = process.env.PORT
const URL = process.env.URL



app.use(cors({
    origin: 'https://e-commerce-web-1-6t8c.onrender.com',
    credentials: true
}));
app.use(express.json())
app.use(bodyparser.json())
app.use("/payment/webhook", express.raw({ type: "application/json" }));


app.use("/", userLogin)
app.use("/", adminUser)
app.use("/", product)
app.use("/", category)
app.use("/", CartItem)
app.use("/", paymentRoutes)
app.use("/", webhookRoutes)




db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed!", err);
    }
    app.listen(PORT, () => {
        console.log(`Connected!! Server Running On ${URL}`)
    })
})
