let mongoose = require("mongoose")
const {DB_CONNECTION} = require("../config/config")



module.exports= {

    //Variable to indicate the connection status
    connection: false,

    //Function to do connect

    connect: ()=>{
        //is connection is active
        if(this.connection) return this.connection

        //connect to DB

        mongoose.connect(DB_CONNECTION)
        .then((connection)=>{
            console.log("Connection");
        })
        .catch((error)=>{
            console.log("Error");
        })

    },

    disconnect: ()=>{
        mongoose.connection.close()

        .then(()=>{
            console.log("Disconnection");
        })
        // .catch((error)=>{
        //     console.log("Error");
        // })

    }
}