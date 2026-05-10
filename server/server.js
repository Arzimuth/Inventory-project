require('dotenv').config()
const express = require('express')

const app= express()

const cors = require("cors")
const morgan = require("morgan")


const connectDB = require("./db/db")
const auth =require("./Routes/Auth")
const category = require("./Routes/Category")
const supplier =require("./Routes/Supplier")
const product = require("./Routes/Product")
const order = require("./Routes/Order")
const dashBoard = require("./Routes/Dashboard")

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api',auth)
app.use("/api/category",category)
app.use("/api/supplier",supplier)
app.use("/api/product",product)
app.use("/api/order",order)
app.use("/api/dashboard",dashBoard)


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("Server runung on port 5000")
})
    
    
    