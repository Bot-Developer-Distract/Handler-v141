const { Client } = require("discord.js")
const mongoose = require("mongoose"); const mongo = process.env.DATABASE

module.exports = {
    name: "ready",

    /**
     * @param {Client} client 
     * @param {mongoose} mongo
     */

    async execute(client) {
        
        /**
         * mongodb Database for store data 
         * multi guild.
         */
        if (!mongo) return
        mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true
        }).then(() => { console.log("🔹 Database Connected!") }).catch(err => console.log(err))
    }
}