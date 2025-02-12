const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const db = require("./connection/connection")
const userLogin = require("./routes/loginRoute/userLoginRoute")
const product = require("./routes/pagesRoute/productPageRoute")


const app = express()
const PORT = process.env.PORT
const URL = process.env.URL

app.use(cors())
app.use(express.json())
app.use(bodyparser.json())
app.use("/", userLogin)
app.use("/", product)




db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed!", err);
    }
    app.listen(PORT, () => {
        console.log(`Connected!! Server Running On ${URL}`)
    })
})
