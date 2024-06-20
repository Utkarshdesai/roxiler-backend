pie = [
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
            7,
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


bar = [
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
            1,
          ],
        },
      },
    },
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [
          0, 100, 200, 300, 400, 500, 600, 700, 800,
          900, 10000,
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


stats = [
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
            6,
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