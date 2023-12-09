const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('test for slash command feature'),
	async execute(interaction) {
		await interaction.reply('it works!');
	},
};