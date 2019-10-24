let express = require('express');
let creditCtr = require('../controllers/credit.controller')

let creditRouter = express.Router();

creditRouter
    //Get all credits
    .get('/', creditCtr.getAllCredits)
    //Create an credit
    .post('/create', creditCtr.find, creditCtr.createCredit)
    //Drop an credit
    .delete('/delete/:_id', creditCtr.deleteCredit)
    //Update the credit
    .put('/update/:_id', creditCtr.updateCredit);




module.exports = creditRouter;