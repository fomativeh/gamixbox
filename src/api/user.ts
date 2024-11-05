import callEndpoint from "@/app/utils/callEndpoint"

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const fetchUserAccount = async (chatId: number, token: string) => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}`, "GET", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const updateWalletAddress = async (chatId: number, walletAddress: string, token: string) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}/updateWalletAddress`, "PATCH", { walletAddress }, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const updateBalance = async (chatId: number, newBalance:number, token: string) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/coinBalance/${chatId}`, "PATCH", {newBalance}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const fetchFriends = async (chatId: number, token: string) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}/referrals`, "GET", token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const buyMultitap = async (chatId: number, token: string, currentBalance:number) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}/multitap`, "POST", {currentBalance}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const buyBooster = async (chatId: number, token: string, type:number, currentBalance:number) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}/booster`, "POST", {currentBalance, type}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const claimDaily = async (chatId: number, token: string, currentBalance:number) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}/claim`, "POST", {currentBalance}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}