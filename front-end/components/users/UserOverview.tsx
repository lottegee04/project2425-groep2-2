import { User } from "../../types";
import React from "react"

type Props = {
    users:Array<User>
}

const UserOverview: React.FC<Props> = ({users}) =>{
    return (
        <>
        {users && 
        users.map((user, index)=>(
            <table className="border border- border-4 m-2 bg-secondary bg-opacity-25">
            <tr>
                <td>user id: </td>
                <td>{user.id}</td>
            </tr>
            <tr>
                <td>username:</td>
                <td>{user.username}</td>
            </tr>
            <tr>
            </tr>
            </table>
        ))
        }
        {!users&&
        <p>No Active Users</p>}
        </>
    )
}

export default UserOverview;