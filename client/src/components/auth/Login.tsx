import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
    setUsername: (value: string) => void, 
    setPageView: (value: string) => void,
    setUserId: (value: number) => void,
}

const Login: React.FC<Props> = ( {setUsername, setUserId, setPageView }) => {
    const inputUsername = useRef<any>("");
    const inputPassword = useRef<any>("");

    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Set focus on first input when component loads
    useEffect(() => {
        inputUsername.current.focus();
    }, []);

    // Reset any error messages when user is typing user or password
    useEffect(() => {
        setErrorMessage("");
    }, [loginUser, loginPassword]);

    // calls handleSubmit on function of login form
    const handleLoginClick = async (e : React.MouseEvent<HTMLButtonElement>) => {
        // Prevents default behavior form which is reload page
        e.preventDefault();
        // Post request to submit login information
        try {
                const response = await axios.post(`${apiUrl}/login`, {
                    username: loginUser, password: loginPassword,
                },
                { withCredentials: true }
            );

            setUsername(response.data.username);
            setUserId(response.data.id)
            setPageView("homepage"); 
            
        } catch (err : any) {
            console.error(err.response.data.error);
            setErrorMessage(err.response.data.error);
        }
    }

    return (
        <>
            <div>
                <form>
                    <div className="text-center mb-5">Login Page</div>
                    <div className="text-red-500">{errorMessage}</div>
                    <label className="text-white">Username:</label>
                        <input
                            className="text-black mb-2 w-full"
                            type="text"
                            id="username"
                            ref={inputUsername}
                            value={loginUser}
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLoginUser(e.target.value)}
                        >
                        </input>
                    <label className="text-white">Password:</label>
                        <input
                            className="text-black mb-5 w-full"
                            type="password"
                            id="password"
                            ref={inputPassword}
                            value={loginPassword}
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
                            >
                        </input>
                        <br/>
                    <button
                        className="border text-green-500 p-2 mb-2 w-full"
                        type="button"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;