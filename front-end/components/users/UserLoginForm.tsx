import { useState } from "react";
import { useRouter } from "next/router";
import { StatusMessage } from "../../types";
import classNames from "classnames";
import UserService from "../../services/UserService";
const UserLoginFrom: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    
    const clearErrors = () =>  {
        setNameError("");
        setPasswordError("");
        setStatusMessage([]);
    }
    const validate = (): boolean => {
        let result = true;
        if (!username && username.trim() === "") {
            setNameError("Username is required.")
            result = false;
            };
        if(!password && password.trim() === "") {
            setPasswordError("Password is required.")
            result = false;
        }
        return result;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        clearErrors();
        if (!validate()) {
            return;
        }
        const user = {username, password};
        const response = await UserService.loginUser(user);
        if (response.status === 200) {
            const user = await response.json();
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    token:user.token,
                    username: user.username,
                    role: user.role,
                })
            );
            sessionStorage.setItem("loggedInUser",username);
            setStatusMessage([{
                message:"Login successfull. Redirecting to homepage...",
                type:"success"
            },]);
            setTimeout(() => {
                router.push("/");},2000);
        } else if (response.status === 401) {
            const {errorMessage} = await response.json();
            setStatusMessage([{message: errorMessage, type: "error"}])
        } else {
            setStatusMessage([{
                message: "Oops, an error has occurred. Please try again later.",
                type: "error"
                },
            ]);
        };
        
    };

    return (
        <>
        <h3>Login</h3>
        {statusMessage && (
            <div>
                <ul className="list-none">
                    {statusMessage.map(({message,type},index) => (
                        <li 
                        key={index}
                        className={classNames({
                            "text-[#b62626]": type =="error",
                            "text-[#26b639]": type =="success",
                        })} >
                            {message}
                        </li>
                    ) )}
                </ul>
            </div>
        )}
        <form  onSubmit={(event) => (handleSubmit(event))} className=" border flex flex-center flex-col p-3 rounded shadow ">
            <div className="flex-row my-3" >
            <label htmlFor="nameInput">
                Username: 
            </label>
            
            <input className="mx-2 border-2 border-gray-300 rounded"
            id="nameInput"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            />
            {nameError && <div className="text-[#b62626] text-center"> {nameError} </div>}
            </div>
            <div className="flex-row my-3">
            <label htmlFor="nameInput">
               Password: 
            </label>
            
            <input className="mx-2 border-2 border-gray-300 rounded"
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && <div className="text-[#b62626] text-center"> {nameError} </div>}
            </div>
            
            <button type="submit" className="m-2 p-2 rounded bg-[#474132] text-[#ffffff]">Login</button>
        </form>
       
        </>
    ); 
};
export default UserLoginFrom
