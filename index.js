// Import the modules needed from discord.js
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Events,
  GatewayIntentBits,
  Guild,
  Collection,
} = require("discord.js");

// Load .env file
require("dotenv/config");

// Importing the import.js module
const oAi = require("./openai");
const { msgHistory } = require("./commands/utility/intcoderead");

// Initialize (create) a new Discord client with specific gateway intents (intents are ways to declare what events I want the bot to receive from Discord)
const client = new Client({
  intents: [
    //guild-related events, such as when the bot joins or leaves a server.
    GatewayIntentBits.Guilds,
    // messages sent to guilds, such as new messages in text channels.
    GatewayIntentBits.GuildMessages,
    //  information about the text content of messages.
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

// Log in to Discord using the bot token from the .env file
client.login(process.env.BOT_TOKEN);

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Event listener for when the client is ready
client.once(Events.ClientReady, (clientUser) => {
  console.log(`Logged in as ${clientUser.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// Event listener for messages (async function)

client.on(Events.MessageCreate, async (msg) => {
  try {
    // Ignore messages from other bots
    if (msg.author.bot) return;
    // console.log(msg, "mentions users", msg.mentions.users);

    //if chatbot is mentioned in the reply
    if (msg.mentions.repliedUser.id === process.env.CLIENT_ID) {
      if (
        msg.content.toLowerCase().includes("!answer") &&
        msg.content.length > 10
      ) {
        msg.reply("Checking your input...");
        msg.reply(
          "https://media1.tenor.com/m/Jb3g_BKTF-gAAAAC/sabrina-the-teenage-witch-cat.gif"
        );

        //fetch message and channel id
        const messageContent = await msg.guild.channels.cache
          .get(msg.reference.channelId)
          .messages.fetch(msg.reference.messageId);
        //call main function in openai.js
        const answerToSend =
          "Assess and feedback whether the following text (beginning with the word `Answer`) describes the following piece of javascript code (beginning with the word `Code`) well and clearly so it is easy to understand: " +
          "Answer" +
          msg.content +
          "Code" +
          messageContent.content;
        const openAiAnswer = await oAi.main(answerToSend);
        // add "spoiler" formatting to answer
        msg.reply(openAiAnswer);
      } else if (
        msg.content.toLowerCase().includes("!answer") &&
        msg.content.length < 10
      ) {
        msg.reply("working on it...");
        msg.reply(
          "https://media1.tenor.com/m/b_4MO5WiulkAAAAd/ill-waiting.gif"
        );

        //fetch message and channel id
        const messageContent = await msg.guild.channels.cache
          .get(msg.reference.channelId)
          .messages.fetch(msg.reference.messageId);
        //call main function in openai.js
        const messageToSend =
          "please describe the following code as thought you were describing to a beginner: " +
          messageContent.content;
        const openAiAnswer = await oAi.main(messageToSend);
        // add "spoiler" formatting to answer
        msg.reply("||" + openAiAnswer + "||");
      } else if (!msg.content.toLowerCase().includes("!answer")) {
        msg.reply(
          "Type: `/jscoderead` to run this bot.\n" +
          "Reply to the code problem with `!answer` followed by your own answer to get feedback.\n" +
          "Or reply to the code problem just with `!answer` to get an answer."
        );
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});
