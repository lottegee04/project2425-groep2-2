const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }
    })

}

const UserService = {
    getAllUsers,
}

export default UserService