let express = require('express');
let userCtr = require('../controllers/user.controller')

let userRouter = express.Router();

userRouter
    //Get all users
    .get('/', userCtr.getAllUsers)
    .post('/login', userCtr.login)
    //Create an user
    .post('/create', userCtr.find, userCtr.generateHash, userCtr.createUser)
    //Drop an user
    .delete('/delete/:_id', userCtr.deleteUser)
    //Update the user
    .put('/update/:_id', userCtr.updateUser);




module.exports = userRouter;