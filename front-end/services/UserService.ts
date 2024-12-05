import { User } from "../types"

const getUsers = async () => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            Authorization: `${token}`,
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
    getUsers, loginUser
}

export default UserService