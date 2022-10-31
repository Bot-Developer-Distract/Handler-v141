const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = async (interaction, pages, time = 60000) => {
    if (!interaction || !pages || !(pages?.length > 0) || !(time > 10000)) throw new Error("❌ Invalid Parameters");

    let index = 0, row = new ActionRowBuilder()
        .addComponents(
            [
                new ButtonBuilder({       
                    customId: "1", emoji: "◀",
                    style: ButtonStyle.Secondary,
                    disabled: true
                }),

                new ButtonBuilder({
                    customId: "2", emoji: "▶",
                    style: ButtonStyle.Secondary,
                    disabled: pages.length < 2
                }),

                new ButtonBuilder({
                    customId: "3", emoji: "🗑",
                    style: ButtonStyle.Secondary
                })
            ]);

    let data = { embeds: [pages[index]], components: [row], fetchReply: true };

    const msg = interaction.replied ? await interaction.followUp(data) : await interaction.reply(data);
    const col = msg.createMessageComponentCollector({
        filter: i => i.user.id === interaction?.user?.id || interaction?.author?.id,
        time
    });

    col.on('collect', (i) => {
        if (i.customId === "1") index--;
        else if (i.customId === "2") index++;
        else return col.stop();

        row.components = [
            new ButtonBuilder({                
                customId: "1", emoji: "◀",
                style: ButtonStyle.Secondary,
                disabled: index === 0
            }),

            new ButtonBuilder({              
                customId: "2", emoji: "▶",
                style: ButtonStyle.Secondary,
                disabled: index === pages.length - 1
            }),

            new ButtonBuilder({            
                customId: "3", emoji: "🗑",
                style: ButtonStyle.Secondary
            })
        ];

        i.update({components: [row], embeds: [pages[index]]
        })
    });

    col.on('end', () => { msg.edit({ components: []
        })
    })
}

