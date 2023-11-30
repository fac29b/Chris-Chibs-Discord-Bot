//
//retrieves keys
require("dotenv").config();

//retrive openai api
const OpenAI = require("openai").OpenAI;
const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: "can you help me today?",
      },
    ],
  });
  console.log("return general completion async function:", completion);
  console.log("completion.choices:", completion.choices);
}

//simple function to return below for debugging
const debug = () => {
  return "openai.js running";
};

// Adding the code below to allow importing
// the functions in other files
module.exports = { debug, main };
