// Import the modules needed from discord.js
const { Client, Events, GatewayIntentBits } = require("discord.js");

// Load BOT_TOKEN variable from the .env file
require("dotenv/config");

// Importing the import.js module
// The ./ says that the "openai.js" module
// is in the same directory as
// the index.js file
const oAi = require("./openai");

// Importing the import.js module from command-processing
const processCommand = require('./command-processing');


// Initialize (create) a new Discord client with specific gateway intents (intents are ways to declare what events I want the bot to receive from Discord)
const client = new Client({
  intents: [
    //guild-related events, such as when the bot joins or leaves a server.
    GatewayIntentBits.Guilds,
    // messages sent to guilds, such as new messages in text channels.
    GatewayIntentBits.GuildMessages,
    //  information about the text content of messages.
    GatewayIntentBits.MessageContent,
  ],
});

// Event listener for when the client is ready
client.once(Events.ClientReady, (clientUser) => {
  console.log(`Logged in as ${clientUser.user.tag}`);
});

// Log in to Discord using the bot token from the .env file
client.login(process.env.BOT_TOKEN);

// Define the ID of the channel where the bot should listen for messages
const BOT_CHANNEL = "1179012028497674273";

//variables for chat history storage
let openAIMsg = "";
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

// Event listener for messages (async function)
client.on(Events.MessageCreate, async (msg) => {
  try {
    // Ignore messages from other bots
    if (msg.author.bot) return;

    //  processCommand.processCommand(msg);

         // Check if a command was processed
    if (processCommand.processCommand(msg)) {
      // If a command was processed, stop further execution
      return;
    }

    // FOR CATCH ERROR TEST PURPOSES
    //errorThrower();

    // Ignore msgs not in the specified BOT_CHANNEL
    // if (msg.channel.id !== BOT_CHANNEL) return

    //test if chatbot working
    if (msg.content === "ping") {
      msg.channel.sendTyping();
      msg.reply("Pong!");
    }

    

    //run function to add typed content from user
    addUserMsg("user", msg.content);

    //send msgHistory to "main" function in openai.js
    const openAIresult = await oAi.main(msgHistory);

    //discord showing typing is happening
    msg.channel.sendTyping();

    //add reply from openAI
    msg.reply(openAIresult);

    //add openAIreult to message history
    addUserMsg("assistant", openAIresult);
    // console.log("index.js msgHistory adding openAIresult:", msgHistory);
  } catch (error) {
    console.error("Error:", error.message);
  }
});
