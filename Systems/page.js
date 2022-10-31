const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

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
    const collector = msg.createMessageComponentCollector({
        filter: (b) => {
            if (b.user.id === interaction.user.id) return true;
            else {
                b.reply({
                    ephemeral: true,
                    embeds: [new EmbedBuilder()
                        .setDescription(`Only **<@${interaction.user.id}>** can use this button, if you want then you've to run the command again.`)
                        .setColor("Blue")
                    ]
                });
                return false;
            }
        },
        componentType: ComponentType.Button,
        time
    });

    collector.on('collect', (i) => {
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

    collector.on('end', () => { msg.edit({ components: []
        })
    })
}
