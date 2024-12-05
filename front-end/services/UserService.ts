import { User } from "../types"

const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }
    })

}

const loginUser = (user:User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

const UserService = {
    getAllUsers, loginUser
}

export default UserService