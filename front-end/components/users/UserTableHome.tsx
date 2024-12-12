import { useEffect, useState } from "react";
import { User } from "../../types";
import UserService from "../../services/UserService";
import useSWR from "swr";

type Props = {
    users: Array<any>
}
const UserTableHome: React.FC<Props> = ({ users }) => {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }
    return (
        <>
        <table>
        <thead>
            <tr className=" bg-[#af9a81] flex flex-row items-center m-2 p-1 rounded-2xl text-white font-bold text-xl">
                <th className="w-56 m-2 px-5 p-3">Username</th>
                <th className="w-56 m-2 px-5 p-3">Password</th>
                <th className="w-56 m-2 px-5 p-3">Role</th>
            </tr>
        </thead>
        <tbody>
        {users && 
        users.map((user,index) => {
            return (
            <tr key={index} className="flex flex-row items-center border-b-2 border-[#d6ccaf] font-semibold text-xl">
                <td className="w-56 m-2  px-5 p-3">{user.username}</td>
                <td className="w-56 m-2  px-5 p-3">{user.password}</td>
                <td className="w-56 m-2  px-5 p-3">{user.role}</td>
            </tr>);
        } )}
        </tbody>
        </table>
        </>
    )
}

export default UserTableHome;