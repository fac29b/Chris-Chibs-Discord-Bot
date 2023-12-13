//
//retrieves keys
require("dotenv").config();

//retrieve openai api
const OpenAI = require("openai").OpenAI;
const openai = new OpenAI();
let ChatGptMsg2 = "";



async function main2(msgHistory) {
  // console.log(msgHistory);
  try { 
      
      const completion = await openai.chat.completions.create({
      model: "gpt-4",
      max_tokens: 300,
      messages: msgHistory,
        
    });
    // console.log("bot answer:", completion.choices[0].message.content); ##
    ChatGptMsg2 = completion.choices[0].message.content;
    return ChatGptMsg2;
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
module.exports = { debug, main2, ChatGptMsg2 };
