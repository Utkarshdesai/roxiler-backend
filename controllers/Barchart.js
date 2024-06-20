  const mongoose = require('mongoose')
  const product = require('../models/Product_transaction')
 
  
  const Barchart  = async (req, res) => {

     try {
      const {month} = req.query ;

      const parsedMonth = parseInt(month)

       const showbarchartdata = await product.aggregate(
        [
          {
            $match: {
              $expr: {
                $eq: [
                  {
                    $month: {
                      date: "$dateOfSale",
                      timezone: "+05:30",
                    },
                  },
                  parsedMonth ,
                ],
              },
            },
          },
          {
            $bucket: {
              groupBy: "$price",
              boundaries: [
                0, 101, 201, 301, 401, 501, 601, 701, 801,
                901, 10000,
              ],
              default: "Other",
              output: {
                count: {
                  $sum: 1,
                },
              },
            },
          },
        ]
       )      
     
       res.json(
        showbarchartdata
       )

     } catch (error) {
      res.status(500).send('Error while showing barchart data ');
     }
  }

  module.exports = Barchart