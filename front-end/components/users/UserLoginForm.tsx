import { useState } from "react";
import { useRouter } from "next/router";
const UserLoginFrom: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");

    return (
        <>
        <h3>Login</h3>
        <form className="flex flex-center">
            <label htmlFor="nameInput">
                Username: 
            </label>
            <input
            id="nameInput"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            />
        </form>
        <button
        type="submit">Login</button>
        </>
    );
};
export default UserLoginFrom
