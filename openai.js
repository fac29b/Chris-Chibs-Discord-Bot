//
//retrieves keys
require("dotenv").config();

//retrive openai api
const OpenAI = require("openai").OpenAI;
const openai = new OpenAI();
let ChatGptMsg = "";

async function main(userMsg) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 200,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: userMsg,
      },
    ],
  });
  //console.log("completion.choices:", completion.choices);
  console.log("bot answer:", completion.choices[0].message.content);
  ChatGptMsg = completion.choices[0].message.content;
  return ChatGptMsg;
}

//simple function to return below for debugging
const debug = () => {
  return "openai.js running";
};

// Adding the code below to allow importing
// the functions in other files
module.exports = { debug, main, ChatGptMsg };
