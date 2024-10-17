require("dotenv").config(); // for bot security reasons, dot env is recommended to store crucial data
const { Telegraf } = require("telegraf"); //import the Telegraf constructor
const express = require("express"); // import express
const app = express(); // create an express app
const token = process.env.TOKEN; //import the token safely
const bot = new Telegraf(process.env.TOKEN); //initialise bot

const topicBuilder = require("./ai");

// Express routes
app.get("/", (req, res) => {
  res.redirect("https://t.me/cogniai_bot"); // replace with your link
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

try {
} catch (error) {
  console.log(error);
}

bot.use((ctx, next) => {
  if (ctx.chat.type == "private") {
    next();
  }
  // console.log(ctx.chat.type);
});

bot.start(async (ctx) => {
  let result = await topicBuilder(`Hello, I am ${ctx.chat.first_name}`);
  ctx.reply(`${result}`);
});

bot.on("text", (ctx) => {
  try {
    var userInput = ctx.message.text;

    async function Aioutput() {
      let result = await topicBuilder(userInput, ctx.chat.id);
      ctx.reply(`${result}`);

      return;
    }
    Aioutput();
  } catch (error) {
    ctx.reply(error);
  }

  return;
});

bot.launch();
console.log("Bot has started....");
