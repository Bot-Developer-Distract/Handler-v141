const { Client, ChatInputCommandInteraction } = require("discord.js")

/**
 *  require EditReply fection 
 */
const { Reply, EditReply } = require("../../Systems/Reply") 

module.exports = {
    name: "ping",
    description: "Displays the bot's current latency",
    category: "Information",

    /**
     * @BotPerms to set permission. if bot dont have this permission then bot 
     * can't execute this coomands. 
     * bot throw, I need This ["permission name"] to execute this commands.
     */
    BotPerms: ["Administrator"],

     /**
     * @UserPerms to set permission. if user dont have this permission then bot 
     * can't execute this coomands. 
     * bot throw error, You need This ["permission name"] to execute this commands.
     */
    UserPerms: ["Administrator"],

    /**
     * Only devoloper can use this commands if  DevOnly: true,
     * else if  DevOnly: false 📴 This feture off.
     */
    DevOnly: false,

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction, client) {

        await interaction.deferReply()

        /**
         * This a fection of EditReply
         * 
         * How to use ?? 
         * EditReply(interaction, "<your emoji>", `<your message content>`)
         */
        return EditReply(interaction, "✅", `The current Websocket Lantency is: \`${client.ws.ping} ms\``)

    }
}

