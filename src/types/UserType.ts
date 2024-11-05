import { FriendsType } from "./FriendType";

export interface UserType {
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    balance: number;
    level: {
      levelCount: number | null;
      levelNickname: string | null;
    };
    referrals: FriendsType[]
    chatId: number;
    completedTasks: string[]; // ids of completed tasks
    ongoingTasks: string[]; // ids of ongoing tasks
    walletAddress: string | null;
    booster2:boolean
    booster3:boolean
    booster4:boolean
    multitap: boolean;
    _id: string|null;
    createdAt: string;
    updatedAt: string;
    avatar:string|null
    lastDailyLoginClaimTime:string | null
  }
  