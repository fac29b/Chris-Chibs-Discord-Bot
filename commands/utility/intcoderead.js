const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('intcoderead')
		.setDescription('Produces code to be read ')
        .addStringOption(option => 
            option.setName('language')
            .setDescription('Select language option for code interview')
            .setRequired(true)
            .addChoices(
                {name:'JS', value: 'Javascript'},
                {name:'PY', value: 'Python'},
                {name:'TS', value: 'Typescript'},
                )),
            
	async execute(interaction) {
		await interaction.reply('Code tbc');
	},
};