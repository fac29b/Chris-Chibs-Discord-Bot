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
  console.log("message history = ", msgHistory)
};

addUserMsg("system", "You are a helpful assistant");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("intcoderead")
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
          { name: "absolute beginner", value: "absolute beginner" },
          { name: "intermediate beginner", value: "intermediate beginner" },
          { name: "confident beginner", value: "confident beginner" }
        )
    ),

  async execute(interaction) {
    const language = interaction.options.getString("language");
    const level = interaction.options.getString("level");
    // console.log(`${language} and ${level}`);
    await interaction.deferReply();

    const userPrompt = `Generate one code-reading challenge in ${language} code for a ${level}. Don't show the answer or explain the code. Return the code only`;
    addUserMsg("user", userPrompt);

    //call async openai function with message hisotry 
    const openAIresult2 = await oAi2.main2(msgHistory);
    await interaction.editReply(openAIresult2);

    addUserMsg("assistant", openAIresult2);
    

    // // Create a new object with the question property set to the value of openAIresult2
    // const newChallenge = {
    //   question: openAIresult2,
    //   answer: null,
    // };

    // // Set the maximum capacity for challenges array
    // if (oAi2.challenges.length < 5) {
    //   // If there's space, add the new challenge to the array
    //   oAi2.challenges.push(newChallenge);
    // } else {
    //   // If the array is at max capacity, remove the oldest challenge (the first one)
    //   oAi2.challenges.shift();
    //   // Add the new challenge to the end of the array
    //   oAi2.challenges.push(newChallenge);
    // }
    // console.log(oAi2.challenges);
  },
  msgHistory,
};

