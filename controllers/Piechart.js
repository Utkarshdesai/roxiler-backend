const mongoose = require('mongoose')
const product = require('../models/Product_transaction')

const ShowPiechart = async ( req, res) => {
  try {
    const {month} = req.query ;
    
    const parsedMonth = parseInt(month)

    const Piechart = await product.aggregate( 
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
            $group: {
                _id: "$category",
                totalitems: {
                $sum: 1,
                },
            },
            },
      ]
    )  

    res.json({
     Piechart
    })



  } catch (error) {
    res.status(500).send('Error while piechart data');
  }
}

module.exports = ShowPiechart