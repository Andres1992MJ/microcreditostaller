const mongoose = require("mongoose")
const User = require("../models/user.model")
const DB = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




// Get all users
const getAllUsers = async (req, res) => {
    DB.connect()

    // console.log("Usuarios", DB.connect());
    // Call to bd

    await User.find()
        .then((response) => {

            res.status(200).send({
                results: response,
                status: 200
            })
        })
        .catch((error) => {
            res.send({
                "error": error.message
            })
        })

    DB.disconnect()
}





const login = async (req, res) => {

    DB.connect()

    // Validate user
    await User.findOne({"email": req.body.email})
    .then( async (response)=>{
        console.log("HASH en BD", response.clave)
        console.log("Clave usuario", req.body.clave,  req.body.clave.trim())
        
        // Compare clave with hash
        await bcrypt.compare(req.body.clave.trim(), response.clave)
        .then((status)=>{
            console.log("STATUS ", status)
            // if status is true, generate token
            if (status){
                jwt.sign({"email": req.body.email}, response.clave, 
                (error, token)=>{
                    console.log("SESSIONNNNNNNNNNNNN", req.session)
                  //  res.send({"token":token})
                  res.cookie("token", token)
                  res.status(200).send({"token": token})
                   })
                
            }
            })
        .catch((error)=>{
            console.log("Incorrect user", error)
        })
    })
    .catch((error)=>{
        console.log("Error", error)
    })


    // jwt.sign({"id": "123456"}, "texto", (err, token) => {
    //     console.log("TOKEN ", token)
    // })

    DB.disconnect()
}


// Create middleware
const find = (req, res, next) => {
    DB.connect()
    //Buscar si la cedula del usuario ya existe 

    User.findOne({
            cedula: req.body.cedula
        })
        .then((response) => {
            console.log("user ", response)
            // If response is not nul, the user already exists
            if (response !== null) {
                return res.status(500).send({
                    "error": "User alredy exists"
                })
            }
            // Can be user
            else {
                next()
            }
        })
        .catch((error) => {
            console.log("error", error);
            res.send({
                "error": error.message
            })
            DB.disconnect()
        })

}


const generateHash = async (req, res, next) => {
    console.log("Generate Hash", req.body.clave);
    let my_hash = "";

    await bcrypt.hash(req.body.clave, 10).then((hash) => {
        console.log("hash", hash);
        my_hash = hash
        req.body.clave = my_hash
        next()
    })

    bcrypt.compare("andres", my_hash).then((res) => {
        console.log("Resultado", res);
    })

}

// Create an user
const createUser = async (req, res) => {

    // Create user when not exists
    let newUser = new User(req.body)
    await newUser.save()
        .then((response) => {
            // send response in JSON format
            res.status(201).send({
                "mensaje": "Usuario creado correctamente",
                "status": 201
            })
        })
        .catch((error) => {
            // send response in JSON format
            res.status(404).send({
                "error": error.message,
                "status": 404
            })
        })

    DB.disconnect()
}

// Delete an user
const deleteUser = async (req, res) => {
    DB.connect()

    await User.findById(req.params._id)
        .then(async (userFound) => {
            //Delete User
            await userFound.remove()
                .then((userDeleted) => {
                    //The user has been delete
                    res.status(200).send({
                        "message": "User deleted",
                        "user": userDeleted
                    })
                })
                .catch((error) => {
                    res.send({
                        "error": error.message
                    })
                })
            //res.send({"user": response})
        })
        .catch((error) => {
            res.send({
                "error": "User not exists"
            })
        })
    // Call to bd
    // res.send({"_id": req.params._id})
    DB.disconnect()
}

// Update an user
const updateUser = async (req, res) => {
    DB.connect()

    await User.findById(req.params._id)
        .then(async (userFound) => {

            //----------------------------------------------------
            //     userFound.id= req.body.id
            //     userFound.nombre= req.body.nombre
            //     userFound.apellido= req.body.apellido
            //    userFound.cedula= req.body.cedula
            //    userFound.save()

            //-------------------------------------------------------
            // let change= Object.assign(userFound, req.body)
            //   userFound.save()
            //   .then(()=>{
            //    res.send("Updated")
            //         })
            //   .catch(()=>{
            //     res.send("NO Updated")              
            // })
            //---------------------------------
            // User.update(userFound, req.body)
            //    .then(()=>{
            //        res.send("Updated")
            //             })
            //       .catch(()=>{
            //         res.send("NO Updated")              
            //     })
            //---------------------------------------
            await userFound.update(req.body)
                .then(() => {
                    res.send("Updated")
                })
                .catch(() => {
                    res.send("NO Updated")
                })


        })


        // .then((userFound)=>{
        //     //Delete User
        //     userFound.update({userFound},{userFound:req.body})
        //     .then((userDeleted)=>{
        //         //The user has been delete
        //         res.status(200).send({"message":"User deleted", "user": userDeleted})
        //     })
        //     .catch((error)=>{
        //         res.send({"error": error.message})
        //     })
        //     //res.send({"user": response})
        // })
        .catch((error) => {
            res.send({
                "error": "User not existssssss"
            })
        })
    DB.disconnect()
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    find,
    generateHash,
    login
}