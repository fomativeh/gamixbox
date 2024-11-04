const express = require("express");
const handleError = require("../helpers/handleError");
const User = require("../models/userModel");
const checkLevel = require("../helpers/checkLevel.js");
const getUserPhoto = require("../helpers/getPhoto.js")
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

    res
      .status(200)
      .json({ success: true, data: { ...user._doc, avatar } });

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

    res
      .status(200)
      .json({ success: true, message: "Balance updated" });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

// Handle boosters
userRoutes.post("/:chatId/booster", async (req, res) => {
  let { chatId } = req.params;
  let { type, action } = req.body;

  try {
    if (!chatId) {
      return res
        .status(400)
        .json({ success: false, error: "Chat ID is required." });
    }

    if (!action) {
      return res
        .status(400)
        .json({ success: false, error: "Booster action is required." });
    }

    if (action=="ADD" && !type ) {
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

    if (action === "REMOVE") {
      user.activeBooster = 0;
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Booster removed" });
    } else {
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
        default:
          return res
            .status(400)
            .json({ success: false, error: "Invalid booster type." });
      }

      if (user.balance < boosterCost) {
        return res.status(403).json({
          success: false,
          data: user,
          message: `Insufficient balance for booster ${type}x`,
        });
      }

      user.balance -= boosterCost;
      user.activeBooster = type;
      await user.save();
      res.status(200).json({
        success: true,
        data: user,
        message: `Booster ${type}x bought!`,
      });

      // After 30 seconds, remove multitap
      setTimeout(async () => {
        try {
          user.activeBooster = 0;
          await user.save();
        } catch (error) {
          console.error(`Error removing booster ${type}x after 30s:\n`, error);
        }
      }, 30000);
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

// Handle multitap
userRoutes.post("/:chatId/multitap", async (req, res) => {
  let { chatId } = req.params;
  let { action } = req.body;

  try {
    if (!chatId) {
      return res
        .status(400)
        .json({ success: false, error: "Chat ID is required." });
    }

    if (!action) {
      return res
        .status(400)
        .json({ success: false, error: "Booster action is required." });
    }

    chatId = parseInt(chatId);

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(404).json({ notFound: true, error: "User not found." });
    }

    if (action === "REMOVE") {
      user.multitap = false;
      await user.save();
      return res
        .status(200)
        .json({ success: true, data: user, message: "Multitap removed." });
    } else {
      if (user.balance < 20000) {
        return res.status(403).json({
          success: false,
          data: user,
          message: `Insufficient balance for multitap`,
        });
      }

      user.balance -= 20000;
      user.multitap = true;
      await user.save();
      res
        .status(200)
        .json({ success: true, data: user, message: "Multitap bought." });

      // After 30 seconds, remove multitap
      setTimeout(async () => {
        try {
          user.multitap = false;
          await user.save();
        } catch (error) {
          console.error("Error removing multitap after 30s:\n", error);
        }
      }, 30000);
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

module.exports = userRoutes;
