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
        console.log(`${language} and ${level}`);
        await interaction.deferReply();
        const openAIresult2 = await oAi2.main2(`Show me an example of ${language} code interview question for a  ${level} `);
		await interaction.editReply(openAIresult2);
	},
};