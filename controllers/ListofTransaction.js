const mongoose = require('mongoose')
const product = require('../models/Product_transaction')

const Transaction = async (req, res) => {
   try {
     const {search , month, page = 1 , perPage = 10} = req.query ; 

     const parsedMonth = parseInt(month)

      const searchQuery = {};
      if (search) {
       const searchRegex = new RegExp(search, 'i'); 
       searchQuery.$or = [
         { title: searchRegex },
      
          { price: searchRegex}, 
        ];
      }

     console.log(searchQuery)

      const products = await product.find({
         $expr: {
           $eq: [{ $month: "$dateOfSale" }, parsedMonth],
          },
          ...searchQuery
        })
         .sort({ dateOfSale: -1 })
         .skip((parseInt(page, 10) - 1) * parseInt(perPage, 10))
         .limit(parseInt(perPage, 10));


     res.json(
       { 
            products,
       }
     )

   } catch (error) {
    res.status(500).send('Error while Transaction detail');
   }
}

module.exports = Transaction