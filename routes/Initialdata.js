const express = require('express');

const data = require('../controllers/Apidata')
const bar = require('../controllers/Barchart')
const pie = require('../controllers/Piechart')
const Transaction = require('../controllers/ListofTransaction')
const Stats = require('../controllers/Statistics')


const router = express.Router();

router.get('/seeddb' , data )
router.get('/piedata' ,  pie)
router.get('/bardata' , bar)
router.get('/Statsdata' ,Stats)
router.get('/Transactiondata' , Transaction)

module.exports = router