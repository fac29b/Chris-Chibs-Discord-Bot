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


// addUserMsg("system", "You are a helpful assistant");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("coderead")
    .setDescription("Produces code to be read ")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Select language option for code interview")
        .setRequired(true)
        .addChoices(
          { name: "Javascript", value: "Javascript" },
          { name: "Python", value: "Python" },
          { name: "Typescript", value: "Typescript" }
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
    const language = interaction.options.getString("language");
    const level = interaction.options.getString("level");

    await interaction.deferReply();

    const userPrompt = `Generate one code-reading challenge in ${language} code for a ${level}. Don't show the answer or explain the code. Return the code only`;
    addUserMsg("user", userPrompt);

    //call async openai function with message hisotry 
    const openAIresult2 = await oAi2.main2(msgHistory);
    await interaction.editReply(openAIresult2);

    addUserMsg("assistant", openAIresult2);


    //console.log("message history = ", msgHistory)
  },
  //added export of msgHistory variable
  //msgHistory,
};

