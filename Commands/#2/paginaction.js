const page = require('../../Systems/page');
const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "auto-pages",
    description: "make some automatic pages",
    options: [],

       /**
        * @param {ChatInputCommandInteraction} interaction 
        * @param {Client} client 
        */

    async execute(interaction, client)  {
      
          let pages = [
            new EmbedBuilder().setTitle(`embeds 1`).setDescription(`dadawdi`),
            new EmbedBuilder().setTitle(`embeds 2`).setDescription(`dadawdi`),
            new EmbedBuilder().setTitle(`embeds 3`).setDescription(`dadawdi`),
            new EmbedBuilder().setTitle(`embeds 4`).setDescription(`dadawdi`),
            new EmbedBuilder().setTitle(`embeds 5`).setDescription(`dadawdi`),
            new EmbedBuilder().setTitle(`embeds 6`).setDescription(`dadawdi`),
          ];
          
        await page(interaction, pages)
    }
}