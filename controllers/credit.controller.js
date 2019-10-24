let mongoose = require("mongoose")
let DB= require("../config/database")
let Credit = require("../models/credit.models")

const getAllCredits= async(req, res)=>{
    DB.connect()
    await Credit.find().populate("usuario").exec()
        .then((response) => {

            res.status(200).send({
                results: response,
                status: 200
            })
        })
        .catch((error) => {
            res.send({"error": error.message})
        })

        DB.disconnect()

}

const find = (req, res, next) => {
    DB.connect()    
    Credit.findById(req.body._id)
    .then((response)=>{
        if (response !== null){
            return res.status(500).send({"error":" credit already exists"})
        }
        else{
            next()
        }
    })
    .catch((error)=>{
        res.send({"error": error.nessage})

        DB.disconnect()
    })
}

const createCredit = async (req, res) => {
    console.log("Credit has create");
    
    
   
    let newCredit = new Credit(req.body)

    await newCredit.save()
    .then((response) => {
        // send response in JSON format
        res.status(201).send({
            "mensaje": "Credito creado correctamente",
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
}

const deleteCredit = async (req, res)=> {
    console.log("Credit has Delete");
    DB.connect()
    await Credit.findById(req.params._id)
    .then( async (creditFound)=>{
        //Delete User
        await creditFound.remove()
        .then((creditDeleted)=>{
            //The user has been delete
            res.status(200).send({"message":"User deleted", "user": creditDeleted})
        })
        .catch((error)=>{
            res.send({"error": error.message})
        })
        //res.send({"user": response})
    })
    .catch((error)=>{
        res.send({"error": "Credit not exists"})
    })
    // Call to bd
   // res.send({"_id": req.params._id})
   DB.disconnect()
    
}

const updateCredit = async (req, res)=> {

    DB.connect()
    console.log("Credit has update");
    await Credit.findById(req.params._id)
    .then(async (creditFound)=>{
        await creditFound.update(req.body)
     .then(()=>{
        res.send("Updated")
             })
       .catch(()=>{
         res.send("NO Updated")              
     })

       
    })
    .catch((error)=>{
        res.send({"error": "credit not existssssss"})
    })
    DB.disconnect()
    
}

module.exports ={
    getAllCredits,
    find,
    createCredit,
    deleteCredit,
    updateCredit
}