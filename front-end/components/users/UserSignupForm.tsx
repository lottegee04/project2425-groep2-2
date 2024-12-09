import { useState } from "react";
import { StatusMessage } from "../../types";
import classNames from "classnames";
import UserService from "../../services/UserService";

const UserSignupForm : React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const clearErrors = () =>  {
        setNameError("");
        setPasswordError("");
        setStatusMessage([]);
    }
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        await UserService.signupUser({
            username,
            password,
            role
        });
        setUsername(username);
        setPassword(password);
        setRole(role);
    }
    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = event.target;
        setRole(
            value
        );
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
    <form className=" border flex flex-center flex-col p-3 rounded shadow ">
    <div className="flex-row my-3" >
            <label htmlFor="nameInput">
                Username: 
            </label>
            
            <input className="mx-2 border-2 border-gray-300 rounded"
            id="nameInput"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
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
            required
            />
            {passwordError && <div className="text-[#b62626] text-center"> {nameError} </div>}
            </div>
            <div className="flex-row my-3" >
            <label htmlFor="userRole" className="m-1">Role:  </label>
            <select
            id="userRole"
            name="role"
            value={role}
            onChange={handleRoleChange}
            required>
            <option value= "">Select Role</option>
            <option value="user">User: can add tasks</option>
            <option value="guest">Guest: can only see tasks</option>
            </select>
            </div>
            <button type="submit" className="m-2 p-2 rounded bg-[#474132] text-[#ffffff]">Sign up</button>
    </form>
    </>
)
};
export default UserSignupForm;