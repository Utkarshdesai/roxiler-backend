const mongoose = require('mongoose')
require("dotenv").config();

exports.dbconnect = async () => {
    mongoose.connect(process.env.DBURL , {
       
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
}