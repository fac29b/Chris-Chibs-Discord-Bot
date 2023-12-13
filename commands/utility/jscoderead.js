const { SlashCommandBuilder } = require("discord.js");

// Importing the import.js module
const oAi2 = require("../../openai2");

let msgHistory = [];





//store User messages in chat history
const addUserMsg = (role, content) => {
  //make object with role and content
  let currentMsg = {
    role: role,
    content: content,
  };
  //push object to storage of chat history
  msgHistory.push(currentMsg);
};
addUserMsg("system", "You are a helpful assistant");

const jsT = [
  'Object Methods',
  'Destructuring', 
  'Rest parameters', 
  'Asynchronous javascript',
  'Array Methods',
  'DOM manipulation',
  'String manipulation',
  'Loops',
  'Regex',
  'Datatypes',
  'Function Scope'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jscoderead")
    .setDescription("Produces javascript code to be read ")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Select a subject option for code interview")
        .setRequired(true)
        .addChoices(
          { name: jsT[0], value: jsT[0] },
          { name: jsT[1], value: jsT[1] },
          { name: jsT[2], value: jsT[2] },
          { name: jsT[3], value: jsT[3] },
          { name: jsT[4], value: jsT[4] },
          { name: jsT[5], value: jsT[5] },
          { name: jsT[6], value: jsT[6] },
          { name: jsT[7], value: jsT[7] },
          { name: jsT[8], value: jsT[8] },
          { name: jsT[9], value: jsT[9] },
          { name: jsT[10], value: jsT[10] },
        )
    )
    .addStringOption((option) =>
      option
        .setName("level")
        .setDescription("select a level")
        .setRequired(true)
        .addChoices(
          { name: "absolute novice", value: "absolute novice" },
          { name: "beginner with some experience", value: "beginner with some experience" },
          { name: "confident beginner", value: "confident beginner" },
          { name: "early intermediate level", value: "early intermediate level" },
          { name: "intermediate level", value: "intermediate level" },
          { name: "confident intermediate level", value: "confident intermediate level" }
        )
    ),

  async execute(interaction) {
    const category = interaction.options.getString("category");
    const level = interaction.options.getString("level");
    await interaction.deferReply();
    interaction.editReply('https://media1.tenor.com/m/ilLQkRwNYu0AAAAC/spongebob-waiting.gif');
    const userPrompt = `Generate one code-reading challenge in javascript which focuses on ${category} for a ${level}. Don't show the answer or explain the code. Return the code only`;
    addUserMsg("user", userPrompt);

    //call async openai function with message hisotry 
    const openAIresult2 = await oAi2.main2(msgHistory);
    await interaction.editReply(openAIresult2);

    addUserMsg("assistant", openAIresult2);

    console.log("message history = ", msgHistory)
    
  },
  msgHistory,
};

