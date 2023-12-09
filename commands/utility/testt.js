const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testt")
    .setDescription("final test of basic slash command handling!"),
  async execute(interaction) {
    await interaction.reply("You did it!");
  },
};
