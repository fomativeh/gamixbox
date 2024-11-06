const { Telegraf } = require("telegraf");
require("dotenv/config");
const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Queue = require("queue-promise");
const handleError = require("./helpers/handleError");
const showMenu = require("./helpers/showMenu");
const userRoutes = require("./routes/userRoutes");
const initUser = require("./helpers/initUser");
const handleReferral = require("./helpers/handleReferral");
const userAuth = require("./auth/userAuth");
const User = require("./models/userModel");
const TaskRoutes = require("./routes/taskRoutes");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // This is required to parse JSON requests

// Parse URL-encoded bodies (deprecated in Express v4.16+)
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userAuth, userRoutes);
app.use("/task", TaskRoutes)

const bot = new Telegraf(process.env.BOT_TOKEN);

// Create a queue instance
const queue = new Queue({
  concurrent: 30, // Process one request at a time
  interval: 1000, // Interval between dequeue operations (1 second)
});

app.get("/", (req, res) => {
  res.send("Hello");
});

bot.start(async (ctx) => {
  queue.enqueue(async () => {
    try {
      // If user clicked a referral link
      if (ctx.payload) {
        return await handleReferral(ctx);
      }

      const userExists = await User.findOne({ chatId: ctx.from.id });
      if (userExists) {
        //For existing users
        await showMenu(ctx, false);
      } else {
        //For new users (not referred)
        await initUser(ctx);
      }
    } catch (error) {
      console.log(error);
      handleError(error, ctx);
    }
  });
});

bot.telegram.setMyCommands([
  { command: "/start", description: "Start the gamibox bot" },
]);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

//Connect to DB
const URI = process.env.URI;
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// Log a message when the bot is connected
bot.telegram
  .getMe()
  .then((botInfo) => {
    console.log(`Bot ${botInfo.username} is connected and running.`);
    bot.launch();
  })
  .catch((err) => {
    console.error("Error connecting bot:", err);
  });
