import { LeaderboardType } from "@/types/LeaderboardType";


const usernames = [
    "JcBoateng",
    "MayorCisse",
    "Boltbarner",
    "IkhramNabil",
    "WiltordJboy",
    "NaseemOs04",
    "haleemJaysh97",
    "Lutherz338",
    "ArmstrongPay",
    "NeilPet",
    "Stephen Brady",
    "Albert Einstein",
    "KobebrownC07",
    "ElvisMS164",
    "BuffettAris087",
    "LeBron894",
    "JordanJayz",
    "TomBradyNext",
    "KittyWayne",
    "LeoPap0978"
];

// Helper function to generate a random number within a range
const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Start with a high initial crowdBalance and decrement for each user
let initialBalance = 12000;

// Generate the dummyLeaderboard array
export const dummyLeaderboard: LeaderboardType[] = usernames.map(username => {
    const user = {
        username,
        firstname: null,
        lastname: null,
        crowdBalance: initialBalance, // Set current user's crowdBalance
        chatId: getRandomNumber(1000, 9999) // Random chatId between 1000 and 9999
    };
    
    // Decrease the balance for the next user
    initialBalance = Math.max(initialBalance - getRandomNumber(500, 1000), 0); // Decrement balance by 500-1000, but not below 0
    
    return user;
});
