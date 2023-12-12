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
          { name: "object methods", value: "object methods" },
          { name: "destructuring", value: "destructuring" },
          { name: "rest parameters", value: "rest parameters" },
          { name: "asynchronous javascript", value: "asynchronous javascript" },
          { name: "array methods", value: "array methods" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("level")
        .setDescription("select a level")
        .setRequired(true)
        .addChoices(
          { name: "absolute beginner", value: "absolute beginner" },
          { name: "intermediate beginner", value: "intermediate beginner" },
          { name: "confident beginner", value: "confident beginner" }
        )
    ),

  async execute(interaction) {
    const category = interaction.options.getString("category");
    const level = interaction.options.getString("level");

    await interaction.deferReply();

    const userPrompt = `Generate one javascript code-reading challenge that focuses on ${category} for an ${level}. Don't show the answer or explain the code. Return the code only`;
    addUserMsg("user", userPrompt);

    //call async openai function with message hisotry 
    const openAIresult2 = await oAi2.main2(msgHistory);
    await interaction.editReply(openAIresult2);

    addUserMsg("assistant", openAIresult2);

    console.log("message history = ", msgHistory)
  },
  msgHistory,
};

