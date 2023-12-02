function processCommand(msg) {
  // Check if the message starts with the command prefix
  const commandPrefix = "!";
  if (msg.content.startsWith(commandPrefix)) {
    // Process commands
    const args = msg.content.slice(commandPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check for specific commands
    if (command === "ping") {
      msg.channel.sendTyping();
      msg.reply("Pong!");
      return true; // Command processed, stop further execution
    } else if (command === "say") {
      const sayMessage = args.join(" ");
      msg.channel.send(sayMessage);
      return true; // Command processed, stop further execution
    }

    msg.reply("Sorry, I didn't recognize that command.");
    return true; // Command processed, stop further execution
  }

  return false; // No command processed, continue execution
}

// Export the function
module.exports = { processCommand };
