
const User = require("../models/userModel");
const createUser = require("./createUser");
const showMenu = require("./showMenu");
module.exports = initUser = async (ctx) => {
  const { id } = ctx.from;
  try {
    const userExists = await User.findOne({ chatId: id });
    if (!userExists) {
      await createUser(ctx);
    }
    await showMenu(ctx, true)
  } catch (error) {
    console.log(error);
    ctx.reply("An error occured.");
  }
};
