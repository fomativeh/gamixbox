import callEndpoint from "@/app/utils/callEndpoint"

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const fetchTasks = async (chatId: number, token: string) => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/task/all`, "GET", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const startATask = async (chatId: number, taskId:string, token: string) => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/task/start/${chatId}/${taskId}`, "POST", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const completeATask = async (chatId: number, taskId:string, token: string, balance:number) => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/task/finish/${chatId}/${taskId}`, "POST", {balance}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}