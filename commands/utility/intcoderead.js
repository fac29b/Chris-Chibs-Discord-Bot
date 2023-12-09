const { SlashCommandBuilder } = require('discord.js');

// Importing the import.js module
const oAi2 = require("../../openai2");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('intcoderead')
		.setDescription('Produces code to be read ')
        .addStringOption(option => 
            option.setName('language')
            .setDescription('Select language option for code interview')
            .setRequired(true)
            .addChoices(
                {name:'Javascript', value: 'Javascript'},
                {name:'Python', value: 'Python'},
                {name:'Typescript', value: 'Typescript'}
            ))
            .addStringOption(option =>
                option.setName('level')
                    .setDescription('select a level')
                    .setRequired(true)
                    .addChoices(
                        {name: 'absolute beginner', value: 'absolute beginner'},
                        {name: 'intermediate beginner', value: 'intermediate beginner'},
                        {name: 'confident beginner', value: 'confident beginner'},
                    )
                ),
            
	async execute(interaction) {
        const language = interaction.options.getString('language');
        const level = interaction.options.getString('level');
        //send msgHistory to "main" function in openai.js
        const openAIresult = await oAi2.main2("new message say goodbye");
		await interaction.reply(openAIresult);
	},
};