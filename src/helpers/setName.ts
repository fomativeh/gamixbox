import { FriendsType } from "@/types/FriendType"
import { UserType } from "@/types/UserType"

export const setName = (userData: UserType) => {
    let nameString = ""
    if(!userData._id) return nameString

    if (userData?.firstname) {
        nameString += userData.firstname
    }

    if (userData?.lastname) {
        if (!userData.firstname) {
            nameString = userData.lastname
        } else {
            nameString += ` ${userData.lastname}` //firstname + lastname
        }
    }

    if (!userData?.firstname && !userData?.lastname) {
        if (userData?.username) {
            nameString = userData.username
        } else {
            nameString = "No name"
        }
    }

    return nameString
}


export const setFriendName = (userData: FriendsType) => {
    let nameString = ""

    if (userData?.firstname) {
        nameString += userData.firstname
    }

    if (userData?.lastname) {
        if (!userData.firstname) {
            nameString = userData.lastname
        } else {
            nameString += ` ${userData.lastname}` //firstname + lastname
        }
    }

    if (!userData?.firstname && !userData?.lastname) {
        if (userData?.username) {
            nameString = userData.username
        } else {
            nameString = "No name"
        }
    }

    return nameString
}
