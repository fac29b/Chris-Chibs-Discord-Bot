const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("pingping")
    .setDescription("will send a dm reply to the user"),
    async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username}`);
        await interaction.user.send("right back atcha");
    }
    };



