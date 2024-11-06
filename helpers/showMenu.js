const handleError = require("./handleError");
require("dotenv/config");
let miniAppUrl = process.env.MINI_APP_URL;
module.exports = showMenu = async (ctx, isANewUser) => {
  let { first_name, last_name, username } = ctx.from;
  let greetingName = username ? username : `${first_name} ${last_name}`;
  let appendedCaption = isANewUser
    ? `Welcome to gamixbox.`
    : `Welcome back to gamixbox.`;
  let buttonText = isANewUser ? `Start the game` : `Resume your game`;
  try {
    const caption = `Hey there, ${greetingName}👋\n${appendedCaption}`;
    await ctx.reply(caption, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: buttonText,
              web_app: {
                url: miniAppUrl,
              },
            },
          ],
          [
            {
              text: "Subscribe to the channel",
              url: "https://t.me/gamixbox",
            },
          ],
          [
            {
              text: "Follow our X",
              url: "https://x.com/GAXgamixbox",
            },
          ],
        ],
      },
    });
  } catch (error) {
    handleError(error, ctx);
  }
};
