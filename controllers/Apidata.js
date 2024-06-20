const mongoose = require('mongoose')
const axios = require('axios')
const product = require('../models/Product_transaction')

const Createproduct = async (req, res) => {
  try {
     
    const getdata = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')

     const productdata = getdata.data;

     // Clear existing data
    await product.deleteMany({});

    //Seed database with fetched data
     await product.insertMany(productdata);

    res.status(200).json({
        productdata,
        message : 'seed data stored in db'
    })
      
  } catch (error) { 
    res.status(500).send('not Database initialized with seed data.');
  }
}

module.exports = Createproduct;