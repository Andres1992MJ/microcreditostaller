const STRING_CONNECTION= "mongodb+srv://admin:Admin123@clustermc-rtsuc.azure.mongodb.net/microcredits_db"

module.exports= {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION: STRING_CONNECTION
}
