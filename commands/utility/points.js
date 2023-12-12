const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
	.setName('points')
	.setDescription('Lists or manages user points')

	// Add a manage group
	.addSubcommandGroup((group) =>
		group
			.setName('manage')
			.setDescription('Shows or manages points in the server')
			.addSubcommand((subcommand) =>
				subcommand
					.setName('user_points')
					.setDescription("Alters a user's points")
					.addUserOption((option) =>
						option.setName('user').setDescription('The user whose points to alter').setRequired(true),
					)
					.addStringOption((option) =>
						option
							.setName('action')
							.setDescription('What action should be taken with the users points?')
							.addChoices(
								{ name: 'Add points', value: 'add' },
								{ name: 'Remove points', value: 'remove' },
								{ name: 'Reset points', value: 'reset' },
							)
							.setRequired(true),
					)
					.addIntegerOption((option) => option.setName('points').setDescription('Points to add or remove')),
			),
	)

	// Add an information group
	.addSubcommandGroup((group) =>
		group
			.setName('info')
			.setDescription('Shows information about points in the guild')
			.addSubcommand((subcommand) =>
				subcommand.setName('total').setDescription('Tells you the total amount of points given in the guild'),
			)
			.addSubcommand((subcommand) =>
				subcommand
					.setName('user')
					.setDescription("Lists a user's points")
					.addUserOption((option) =>
						option.setName('user').setDescription('The user whose points to list').setRequired(true),
					),
			),
	),
    async execute(interaction) {
        await interaction.reply('points command works!');
    },

        };
