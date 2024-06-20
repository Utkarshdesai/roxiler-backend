  const mongoose = require('mongoose')
  const product = require('../models/Product_transaction')

  const Statisticsdata = async (req, res) => {
      
      const {month} = req.query ;
 
      const parsedMonth = parseInt(month); 

        try {
          const SaleInfo = await product.aggregate(
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
                  _id: null,
                  totalsale: {
                    $sum: {
                      $toDouble: "$price",
                    },
                  },
                  totalsold: {
                    $sum: {
                      $cond: [
                        {
                          $eq: ["$sold", true],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  totalunsold: {
                    $sum: {
                      $cond: [
                        {
                          $eq: ["$sold", false],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                },
              },
            ]
          )


          res.json(
            {
              SaleInfo
            } 
           
          )

        } catch (error) {
          res.status(500).send('Error while showing Statistics data');
        }

  }

  module.exports = Statisticsdata