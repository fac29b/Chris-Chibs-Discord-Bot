const { RateLimiterMemory } = require('rate-limiter-flexible');

// Import the modules needed from discord.js 
const { Client, Events, GatewayIntentBits } = require("discord.js");

// Load BOT_TOKEN and OPENAI_KEY variables from the .env file
require("dotenv/config");


const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY 
});

const limiter = new RateLimiterMemory({
    points: 1,
    duration: 2, // 2 seconds
  });

// Import modules from the OpenAI library
// const { OpenAIApi } = require("openai");

// Configure the OpenAI library with the provided API key
// const openai = new OpenAIApi({
//   key: process.env.OPENAI_KEY,
// });

// Initialize (create) a new Discord client with specific gateway intents (intents are ways to declare what events I want the bot to receive from Discord)
const client = new Client({
    intents: [
        //guild-related events, such as when the bot joins or leaves a server.
        GatewayIntentBits.Guilds,
        // messages sent to guilds, such as new messages in text channels.
        GatewayIntentBits.GuildMessages,
        //  information about the text content of messages.
        GatewayIntentBits.MessageContent
    ]
});

// Event listener for when the client is ready
client.once(Events.ClientReady, (clientUser) => {
    console.log(`Logged in as ${clientUser.user.tag}`);
});

// Log in to Discord using the bot token from the .env file
client.login(process.env.BOT_TOKEN);

// Define the ID of the channel where the bot should listen for messages
const BOT_CHANNEL = "1179012028497674273";
const PAST_MESSAGES = 5;

// Event listener for messages (async function)
client.on(Events.MessageCreate, async (message) => {
    // Ignore messages from other bots
    if (message.author.bot) return;

    // Ignore messages not in the specified BOT_CHANNEL
    if (message.channel.id !== BOT_CHANNEL) return;
// Check rate limit
    if (await limiter.consume(message.author.id)) {
        // If not rate limited, proceed
        try{
    // Indicate that the bot is typing in the channel
    message.channel.sendTyping();

    // Fetch past messages in the channel, including the current one
    let messages = Array.from(await message.channel.messages.fetch({
        limit: PAST_MESSAGES, 
        before: message.id
    }));
    
    // Extract the actual messages from the fetched data
    messages = messages.map(m => m[1]);
    
    // Include the current message in the list of messages
    messages.unshift(message);

    // Extract unique usernames from the list of messages, including the bot's username
    let users = [...new Set([...messages.map(m => m.member.displayName), client.user.username])];

    // Remove the last user from the list
    let lastUser = users.pop();

    // Create a prompt based on the conversation history
    let prompt = `The following is a conversation between ${users.join(", ")}, and ${lastUser}. \n\n`;

    // Construct the conversation by appending each message to the prompt
    for (let i = messages.length - 1; i >= 0; i--) {
        const m = messages[i];
        prompt += `${m.member.displayName}: ${m.content}\n`;
    }
    // Append the bot's username to the prompt
    prompt += `${client.user.username}:`;

    // Log the constructed prompt to the console
    console.log("prompt:", prompt);

    // Generate a completion from OpenAI based on the prompt

    const response = await openai.completions.create({
        prompt,
        model: "text-davinci-003",
        max_tokens: 500,
        stop: ["\n"]
    });

    // Log the generated response to the console
    console.log("response", response.choices[0].text);

    // Send the generated response to the same channel
    await message.channel.send(response.choices[0].text);

 }catch (error) {
        console.error('Error during OpenAI API call:', error.message);
        // Handle the error as needed
      }
    } else {
      // Log rate limit exceeded
      console.log('Rate limit exceeded - too many requests in a short period.');
      // Optionally, you can inform the user that the bot is currently rate-limited
    }
});




