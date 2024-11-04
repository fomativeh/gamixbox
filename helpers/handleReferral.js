const User = require("../models/userModel");
const createUser = require("./createUser");
const handleError = require("./handleError");
const showMenu = require("./showMenu");
const alreadyReferred = require("./alreadyReferred");
const getPhoto = require("./getPhoto");

module.exports = handleReferral = async (ctx) => {
  const { first_name, last_name, username } = ctx.from;
  const chatId = ctx.from.id
  let inviteId = ctx.payload;

  try {
    //Check if user already has an account
    const userExists = await User.findOne({ chatId });
    if (userExists) {
      return await ctx.reply("You already have an account.");
    }

    //If user clicked a forged link
    if (isNaN(inviteId)) {
      return await ctx.reply(
        "Sorry that link is invalid. Please check and try again."
      );
    }

    inviteId = parseInt(inviteId);

    //Find the invite link owner
    const referrer = await User.findOne({ chatId: inviteId });
    if (!referrer) {
      return await ctx.reply("Sorry, nobody owns that link.");
    }

    //If user clicked their own link
    if (inviteId === chatId) {
      return await ctx.reply("You cannot refer yourself.");
    }

    // Check if user has already been referred
    const alreadyReferredCheck = await alreadyReferred(chatId);

    //If an error prevented checking
    if (alreadyReferredCheck.error) {
      return await ctx.reply("An error occured.");
    }

    //If they've already been referred by someone
    if (alreadyReferredCheck.result) {
      return await ctx.reply("You've been referred before.");
    }

    const referralPhoto = await getPhoto(chatId)
    let referralData = {
      firstname: first_name,
      lastname: last_name,
      username,
    }

    if(referralPhoto){
      referralData.avatar = referralPhoto
    }

    //Process referral
    referrer.referrals.push(referralData);

    await referrer.save();

    //Create user account
    await createUser(ctx);

    await showMenu(ctx, true);
  } catch (error) {
    console.log(error);
    handleError(error, ctx);
  }
};
