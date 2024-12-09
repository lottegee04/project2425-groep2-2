import { useState } from "react";
import { StatusMessage } from "../../types";
import classNames from "classnames";
import UserService from "../../services/UserService";
import {useRouter} from "next/router";

const UserSignupForm : React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const [roleError, setRoleError] = useState<string | null>(null);
    const clearErrors = () =>  {
        setNameError("");
        setPasswordError("");
        setRoleError("");
        setStatusMessage([]);
    }
    const userExists = async (username): Promise<boolean> => {
        const response = await UserService.userExists(username)
        return response;
    }
    const validate = async (): Promise<boolean> => {
        let result = true;
        const userDoesExists = await userExists(username)
        if (!username && username.trim() === "") {
            setNameError("Username is required.")
            result = false;
        } else if (userDoesExists) {
            setNameError(`There is already a user with username: ${username}.`);
            result = false;
        }
        if(!password && password.trim() === "") {
            setPasswordError("Password is required.")
            result = false;
        }
        if (!role && role.trim() === "") {
            setRoleError("Role is required.")
            result = false;
        }
        return result;
    }
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        const isValid = await validate();
        if (!isValid) {
            return;
        }
        const response = await UserService.signupUser({
            username,
            password,
            role
        });
        if (response.status === 200) {
            setStatusMessage([{
                message: "User Signup successfull, now you can log in...",
                type:"success"
            },]);
            setTimeout(() => { router.push("/login");},2000);
        } else if (response.status === 400) {
            const {errorMessage} = await response.json();
            setStatusMessage([{message:errorMessage, type:"error"}])
        } else {
            setStatusMessage([{
                message: "Oops, an error has occurred. Please try again later.",
                type: "error"
                },
            ]);};
        setUsername("");
        setPassword("");
        setRole("");
    }
    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = event.target;
        setRole(value);
    };
    
    return (
    <>
    <h3 className="p-2">Sign up for DoneDeal</h3>
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
    <form onSubmit={(event) => {handleSubmit(event)}} className=" border flex flex-center flex-col p-3 rounded shadow ">
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
           <div className="flex-row my-3" >
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
            <div className="flex-row my-3" >
            <label htmlFor="userRole" className="m-1">Role:  </label>
            <select
            id="userRole"
            name="role"
            value={role}
            onChange={handleRoleChange}>
            <option value= "">Select Role</option>
            <option value="user">User: can add tasks</option>
            <option value="guest">Guest: can only see tasks</option>
            </select>
            </div>
            {roleError && <div className="text-[#b62626] text-center"> {roleError} </div>}
            <button type="submit" className="m-2 p-2 rounded bg-[#474132] text-[#ffffff]">Sign up</button>
    </form>
    </>
    )
};
export default UserSignupForm;