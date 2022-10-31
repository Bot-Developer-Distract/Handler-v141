const { Client, CommandInteraction, InteractionType } = require("discord.js")
const { ApplicationCommand } = InteractionType
const { Reply, EditReply } = require("../../Systems/Reply")

module.exports = {
    name: "interactionCreate",

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client 
     */

    async execute(interaction, client) {

        const { user, guild, commandName, member, type } = interaction

        if (!guild || user.bot) return
        if (type !== ApplicationCommand) return

        const command = client.commands.get(commandName)

        /**
         * If Commands Does not existe Then Delte The Commands. 
         * and Throw the Error ⚠"An error occurred while running the command!"⚠
         */
        if (!command) return Reply(interaction, "❌", `An error occurred while running the command!`, true) && client.commands.delete(commandName)


        /**
         * UserPerms = Commands [ @UserPerms ] Set!! 
         * if UserPerms !== Same current user perms Then ⚠ Error ⚠
         * How to Set user permission:  UserPerms: ["Administrator"], || Multi permissions set at a time. Like this = ["",""]
         */
        if (command.UserPerms && command.UserPerms.length !== 0) if (!member.permissions.has(command.UserPerms)) 
        return Reply(interaction, "❌", `You need \`${command.UserPerms.join(", ")}\` permission(s) to execute this command!`, true)
        

         /**
         * BotPerms = Commands [ @BotPerms ] Set!! 
         * if BotPerms !== Same Bot perms or bot dothave permissions Then ⚠ Error ⚠
         * How to Set Bot permission:  BotPerms: ["Administrator"], || Multi permissions set at a time. Like this = ["",""]
         */
        if (command.BotPerms && command.BotPerms.length !== 0) if (!guild.members.me.permissions.has(command.BotPerms)) 
        return Reply(interaction, "❌", `I need \`${command.BotPerms.join(", ")}\` permission(s) to execute this command!`, true)


        /**
         * @devOnly = true then interaction user 
         * gate error This command is classified! Only devoloper can use this commands
         */
         if (command.DevOnly == true && interaction.user.id !== process.env.DEVOLOPER) 
         return Reply(interaction, `❌`, `This command is classified!`, true)


        /**
         * ALLOWES Parameters Starting with  "interaction" then other Parameters
         * ⚠ Otherwise Commands Not working. Result error log ⚠
         * async execute(interaction, client)
         */
        command.execute(interaction, client)

    }
}