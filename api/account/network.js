const { Router } = require('express');
const { accounts } = require('../../middlewares/validations');
const {newAccount} = require('./controller');


const router = Router();

router.post('/',[accounts], newAccount)



module.exports = router;