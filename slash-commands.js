

const { Client, GatewayIntentBits, Events,SlashCommandBuilder } = require('discord.js');
// Load environment variables from .env file
require('dotenv').config();

function processMsg(msg) {
      // Create a new Discord client
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildMembers, 
      GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.MessageContent, 
      GatewayIntentBits.DirectMessages, 
      GatewayIntentBits.GuildInvites, 
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.DirectMessageTyping, 
      GatewayIntentBits.GuildMessageTyping
     ],

    
  });

  client.login(process.env.BOT_TOKEN);

  client.once(Events.ClientReady, (clientUser) => {
console.log(` ${clientUser.user.tag} is ready to check for commands`);

  const ping = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');
//     async (interaction) => {
//     await interaction.reply('Pong!');
// }

client.application.commands.create(ping);

});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });
}

module.exports = { processMsg };