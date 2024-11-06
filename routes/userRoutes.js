const express = require("express");
const handleError = require("../helpers/handleError");
const User = require("../models/userModel");
const checkLevel = require("../helpers/checkLevel.js");
const getUserPhoto = require("../helpers/getPhoto.js");
const isDifferentDay = require("../helpers/isDifferentDay.js");
const userRoutes = express.Router();

//Fetch a user
userRoutes.get("/:chatId", async (req, res) => {
  let { chatId } = req.params;
  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    chatId = parseInt(chatId);

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(200).json({ notFound: true, error: "User not found." });
    }

    const avatar = await getUserPhoto(chatId);

    res.status(200).json({ success: true, data: { ...user._doc, avatar } });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

//Update wallet address
userRoutes.patch("/:chatId/walletAddress", async (req, res) => {
  let { chatId } = req.params;
  let { walletAddress } = req.body;

  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    if (!walletAddress) {
      return res
        .status(401)
        .json({ success: false, error: "New wallet address is required." });
    }

    chatId = parseInt(chatId);

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(200).json({ notFound: true, error: "User not found." });
    }

    user.walletAddress = walletAddress;
    await user.save();

    res.status(200).json({ success: true, message: "Wallet address updated" });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

//Fetch referrals
userRoutes.get("/:chatId/referrals", async (req, res) => {
  let { chatId } = req.params;
  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    chatId = parseInt(chatId);

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(200).json({ notFound: true, error: "User not found." });
    }

    res.status(200).json({ success: true, data: user.referrals });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

//Update balance from coin taps
userRoutes.patch("/coinBalance/:chatId", async (req, res) => {
  let { chatId } = req.params;
  let { newBalance } = req.body;
  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    if (!newBalance) {
      return res
        .status(401)
        .json({ success: false, error: "New balance is required." });
    }

    chatId = parseInt(chatId);
    newBalance = parseInt(newBalance);

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(200).json({ notFound: true, error: "User not found." });
    }

    //Check for level updates
    const levelStatus = checkLevel(newBalance, user.level.levelCount);

    //Update level if needed
    if (levelStatus.levelUpdateNeeded) {
      user.level = levelStatus.newLevelData;
    }

    //Update balance
    user.balance = newBalance;

    await user.save();

    res.status(200).json({ success: true, message: "Balance updated" });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

// Handle boosters
userRoutes.post("/:chatId/booster", async (req, res) => {
  let { chatId } = req.params;
  let { type, currentBalance } = req.body;

  try {
    if (!chatId) {
      return res
        .status(400)
        .json({ success: false, error: "Chat ID is required." });
    }

    if (!currentBalance) {
      return res
        .status(400)
        .json({ success: false, error: "Current balance is required." });
    }

    if (!type) {
      return res
        .status(400)
        .json({ success: false, error: "Booster type is required." });
    }

    chatId = parseInt(chatId);
    type = parseInt(type);

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(404).json({ notFound: true, error: "User not found." });
    }

    let boosterCost;
    switch (type) {
      case 2:
        boosterCost = 10000;
        break;
      case 3:
        boosterCost = 15000;
        break;
      case 4:
        boosterCost = 20000;
        break;
      case 5:
        boosterCost = 25000;
        break;
      case 6:
        boosterCost = 30000;
        break;
      case 7:
        boosterCost = 35000;
        break;
      case 8:
        boosterCost = 40000;
        break;
      case 9:
        boosterCost = 45000;
        break;
      case 10:
        boosterCost = 50000;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: "Invalid booster type." });
    }

    if (currentBalance < boosterCost) {
      return res.status(403).json({
        success: false,
        message: `Insufficient balance for booster ${type}x`,
      });
    }

    if (user.boosters.includes(type)) {
      return res.status(403).json({
        success: false,
        message: `Booster ${type}x already bought.`,
      });
    }

    const expectedBalanceAfterPurchase = currentBalance - boosterCost;
    const levelChangeNeeded = checkLevel(
      expectedBalanceAfterPurchase,
      user.level.levelCount
    );

    //Change level if needed
    if (levelChangeNeeded.levelUpdateNeeded) {
      user.level = levelChangeNeeded.newLevelData;
    }

    //Deduct balance
    user.balance = expectedBalanceAfterPurchase;

    //Add booster
    user.boosters.push(type);

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        balance: user.balance,
        level: user.level,
        boosters:user.boosters
      },
      message: `Booster ${type}x bought!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

// Handle multitap
userRoutes.post("/:chatId/multitap", async (req, res) => {
  let { chatId } = req.params;
  let { currentBalance } = req.body;
  let multitapCost = 10000;

  try {
    if (!chatId) {
      return res
        .status(400)
        .json({ success: false, error: "Chat ID is required." });
    }
    chatId = parseInt(chatId);

    if (!currentBalance) {
      return res
        .status(400)
        .json({ success: false, error: "Current balance is required." });
    }

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(404).json({ notFound: true, error: "User not found." });
    }

    if (currentBalance < multitapCost) {
      return res.status(403).json({
        success: false,
        message: `Insufficient balance for multitap`,
      });
    }

    if (user.multitap) {
      return res.status(403).json({
        success: false,
        message: `Multitap already bought`,
      });
    }

    const expectedBalanceAfterPurchase = currentBalance - multitapCost;
    const levelChangeNeeded = checkLevel(
      expectedBalanceAfterPurchase,
      user.level.levelCount
    );

    //Change level if needed
    if (levelChangeNeeded.levelUpdateNeeded) {
      user.level = levelChangeNeeded.newLevelData;
    }

    //Deduct balance
    user.balance = expectedBalanceAfterPurchase;

    user.multitap = true;

    await user.save();

    res.status(200).json({
      success: true,
      data: { balance: user.balance, level: user.level, multitap: true },
      message: "Multitap bought!",
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

userRoutes.post("/:chatId/claim", async (req, res) => {
  let { chatId } = req.params;
  const { currentBalance } = req.body;

  try {
    if (!chatId) {
      return res
        .status(400)
        .json({ success: false, error: "Chat ID is required." });
    }
    chatId = parseInt(chatId);

    if (!currentBalance) {
      return res
        .status(400)
        .json({ success: false, error: "Current balance is required." });
    }

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(404).json({ notFound: true, error: "User not found." });
    }

    //For new users
    if (!user.lastDailyLoginClaimTime) {
      user.lastDailyLoginClaimTime = new Date();
      let expectedBalanceAfterClaim = currentBalance + 10000;
      user.balance = expectedBalanceAfterClaim;
      await user.save();

      return res.status(200).json({
        data: {
          lastDailyLoginClaimTime: user.lastDailyLoginClaimTime,
          balance: user.balance,
        },
        success: true,
        error: "Claim successful.",
      });
    }

    //For existing users
    const differentDay = isDifferentDay(user.lastDailyLoginClaimTime);
    if (differentDay) {
      user.lastDailyLoginClaimTime = new Date();
      let expectedBalanceAfterClaim = currentBalance + 10000;
      user.balance = expectedBalanceAfterClaim;
      await user.save();

      return res.status(200).json({
        data: {
          lastDailyLoginClaimTime: user.lastDailyLoginClaimTime,
          balance: user.balance,
        },
        success: true,
        error: "Claim successful.",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Already claimed today." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

module.exports = userRoutes;
