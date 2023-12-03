// Import necessary modules from discord.js
const { Client, GatewayIntentBits, Events } = require('discord.js');
// Load environment variables from .env file
require('dotenv').config();

// Function to start the Ghost Game
function startGhostGame(channel, adminId) {
// Set Ghost Game as active

  // Array to store information about players
  const players = [];

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

  // Event listener triggered once when the client is ready

  client.once(Events.ClientReady, (clientUser) => {
    console.log(` ${clientUser.user.tag} is ready to play Ghost!`);
     channel.send('Wanna play Ghost press \'y\'. We will start the game when the admin commands !start');
    //  return true;
  });

  // Event listener triggered when a new message is created
  client.on(Events.MessageCreate, (msg) => {
    try {
      // Ignore messages from other bots
      if (msg.author.bot) return;

      // Split message content into arguments
      const args = msg.content.split(' ');
      // Get the first argument (command) and convert it to lowercase
      const command = args[0].toLowerCase();

      // Check for specific commands
      if (command === 'y') {
        // Handle user pressing 'y'
        handlePlayersEntry(msg.author);
      } else if (command === `!start` && msg.author.id === adminId) {
        // Start the game (admin command)
        startGame();
      }
    } catch (error) {
      // Log any errors that occur during message handling
      console.error('Ghost Game Error:', error.message);
    }
  });

   // Function to start the game
    async function startGame() {
        try {
            // Check if there are enough players in the game
            if (players.length <= 0) {
                const playersSum = 5 - players.length;
                // Send a message indicating that the game has started but there are no players
                await channel.send(`Not enough players have joined yet. We need at least ${playersSum} more players to press 'y'.`);
            
            } else {
                // Create a new text channel for the game
                const gameChannel = await channel.guild.channels.create('game-room', {
                    type: 'text',
                });

                // Create a string list of players' usernames
                const playersList = players.map(player => player.userName).join(', ');

                // Send a message to the new channel containing the list of players
                await gameChannel.send(`Ghost Game started! Players: ${playersList}, please accept my invitation to the game room!`);

                // Loop through players and send invites
                for (const player of players) {
                    const member = await channel.guilds.members.fetch(player.userId);
                    if (member) {
                        const invite = await gameChannel.createInvite({ maxUses: 1, unique: true });
                        await member.send(`Join the game channel! ${invite.url}`);
                    }
                }

                // Remove the event listener for the handlePlayersEntry event
                client.removeListener(Events.MessageCreate, handlePlayersEntry);
            }
        } catch (error) {
            // Log and handle any errors that occur during the asynchronous operations
            console.error('Ghost Game Error:', error.message);
        }
    }


  

  // Function to handle a user pressing 'y'
  function handlePlayersEntry(user) {
    // Check if the user is already in the game
    const existingPlayer = players.find((player) => player.userId === user.id);

    if (existingPlayer) {
      // If the user is already in the game, log and reply user is already in 
      msg.reply("You are already in the game!");
      console.log(`User ${user.tag} already pressed 'y'.`);
    } else {
      // If the user is not in the game, add a new player to the players array
      const newPlayer = {
        userId: user.id,
        userName: user.username,
        isPlaying: true,
        ghost: false,
        hasAnswered: false,
        hasVoted: false,
      };
      players.push(newPlayer);
      console.log(`User ${user.tag} pressed 'y' and joined the game.`);
      console.log(players);
    }
  }

  // Log in to Discord using the bot token
  client.login(process.env.BOT_TOKEN);
}

// Export the startGhostGame function to make it accessible from other files
module.exports = { startGhostGame};
