require("express-async-errors")
const express = require("express")
const app = express()
require("dotenv").config()
require("./src/db/dbConnection")
const port = process.env.PORT || 5001 
const errorHandlerMiddleware = require("./src/middlewares/errorHandlers")

app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
})

const rooter = require("./src/routers")

app.use(express.json())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))

app.use("/api", rooter)


app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Server ${port} is running...`);
});