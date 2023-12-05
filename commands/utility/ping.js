const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Bong!'),
	async execute(interaction) {
		await interaction.reply('Bang!');
	},
};