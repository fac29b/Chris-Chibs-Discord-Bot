//
//retrieves keys
require("dotenv").config();

//retrieve openai api
const OpenAI = require("openai").OpenAI;
const openai = new OpenAI();
let ChatGptMsg = "";

async function main(msgHistory) {
  console.log(msgHistory);
  try { 
      
      const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",//"gpt-3.5-turbo" "gpt-4"
      max_tokens: 200,
      messages:
      [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: ('please describe the following code as thought you were describing to a beginner: ' + msgHistory),
        },
      ],
    });
    // console.log("bot answer:", completion.choices[0].message.content);
    ChatGptMsg = completion.choices[0].message.content;
    return ChatGptMsg;
}catch (error) {
    console.error("Error in openai.js:", error.message);
    return "Oops! Something went wrong while processing your request. Please try again later.";
    }
    }

//simple function to return below for debugging
const debug = () => {
  return "openai.js running";
};

// export variables to other files
module.exports = { debug, main, ChatGptMsg };
