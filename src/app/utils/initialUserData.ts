import { UserType } from "@/types/UserType";

export const initialUserData: UserType = {
  avatar: null,
  firstname: null,
  lastname: null,
  username: null,
  balance: 0,
  level: {
    levelCount: null,
    levelNickname: null,
  },
  referrals: [],
  chatId: 0,
  completedTasks: [],
  ongoingTasks: [],
  walletAddress: null,
  boosters:[],
  multitap: false,
  _id: '',          // default empty string
  createdAt: '',    // default empty string
  updatedAt: '',    // default empty string
  lastDailyLoginClaimTime: null
};