import { User } from "../types"

const getUsers = async () => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            Authorization: ` Bearer ${token}`,
        }
    })
}
const userExists = async (username: string) : Promise<boolean> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/exists/${username}`,{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        },
    })
    if (!response.ok) {
        throw new Error("failed to look for existing user");
    }
    const result = await response.json();
    return result;
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
const signupUser = async(user: {username: string; password: string; role: string;}) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
         });
    if (!response.ok) {
        throw new Error("Failed to sign up user");
    } 
    return response.json();}
    catch (error) {
        console.error(error);
    }
};


const UserService = {
    getUsers, loginUser, signupUser, userExists
}

export default UserService