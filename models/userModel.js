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
      default: 0,
    },

    level: {
      levelCount: {
        type: Number,
        default: 1,
      },
      levelNickname: {
        type: String,
        default: "Rookie Rush",
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
    activeBooster:{
      type:Number,
      default:0,
    },
    multitap:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
