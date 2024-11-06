const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 850000,
    },

    level: {
      levelCount: {
        type: Number,
        default: 6,
      },
      levelNickname: {
        type: String,
        default: "Pro Power-Up",
      },
    },

    referrals: [
      // {
      //   username: String,
      //   firstname: String,
      //   lastname: String,
      //   avatar:String
      // },
    ],
    chatId: {
      type: Number,
      required: true,
    },
    completedTasks: [String], //ids of completed tasks
    ongoingTasks: [String], //ids of ongoing tasks
    walletAddress: {
      type: String,
      default: null,
    },
    boosters:[Number],//Array of booster types
    multitap: {
      type: Boolean,
      default: false,
    },
    lastDailyLoginClaimTime: {type:Date, default:null}
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
