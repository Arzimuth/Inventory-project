require('dotenv').config()
const express = require('express')

const app= express()

const cors = require("cors")
const morgan = require("morgan")


const connectDB = require("./db/db")
const auth =require("./Routes/Auth")
const category = require("./Routes/Category")


app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api',auth)
app.use("/api/category",category)


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("Server runung on port 5000")
})
    
    
    