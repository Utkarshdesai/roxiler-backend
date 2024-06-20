const express = require('express')
const app = express() 
const cors = require('cors')
const dotenv = require("dotenv");
const database = require('./config/dbconnect')
const fetchdataRoute = require('./routes/Initialdata')


const PORT = process.env.PORT || 5000
//db call
database.dbconnect()

//middleware 
app.use(express.json())
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true ,
    }
))

//routes
app.use('/api/v1/productdata', fetchdataRoute)



app.listen(PORT , () => {
    console.log('server is started')
})

app.get ('/' , (req,res) => {
    res.json('hello welcome to dashboard')
})