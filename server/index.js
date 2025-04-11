const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const db = require("./connection/connection")
const userLogin = require("./routes/loginRoute/userLoginRoute")
const adminUser = require("./routes/loginRoute/adminLoginRoute")
const product = require("./routes/pagesRoute/productPageRoute")
const category = require("./routes/pagesRoute/categoryRoutePage")
const CartItem = require("./routes/pagesRoute/cartItemRoutePage")
const orderRoutes = require("./routes/paymentRoute/orderRoute");
const paymentRoutes = require("./routes/paymentRoute/paymentRoute");
const shippingRoutes = require("./routes/paymentRoute/shippingRoute");

const app = express()
const PORT = process.env.PORT
const URL = process.env.URL

app.use(cors({
    origin: 'https://e-commerce-web-1-6t8c.onrender.com',
    credentials: true
}));
app.use(express.json())
app.use(bodyparser.json())
app.use("/", userLogin)
app.use("/", adminUser)
app.use("/", product)
app.use("/", category)
app.use("/", CartItem)
app.use("/", orderRoutes)
app.use("/", paymentRoutes)
app.use("/", shippingRoutes)




db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed!", err);
    }
    app.listen(PORT, () => {
        console.log(`Connected!! Server Running On ${URL}`)
    })
})
