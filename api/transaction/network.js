const { Router } = require('express');
const { transactions } = require('../../middlewares/validations');
const {authorizeTransaction} = require('./controller');

const router = Router();


router.post('/',[transactions], authorizeTransaction)



module.exports = router;