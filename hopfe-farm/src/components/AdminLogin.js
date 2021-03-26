import React, { useState, useEffect } from 'react';
import '../App.css';
import { AppContext } from './AppContext.js';
import { useHistory } from 'react-router-dom';


const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    
    const appContext = React.useContext(AppContext);
    let history = useHistory();

    
    useEffect(() => {
        appContext.setSelectedIcon("login");
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = async() => {
        const data = {"username": `${username}`, "password": `${password}`};
        const res = await fetch(`${appContext.apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        setUsername("");
        setPassword("");
        if (response['access_token']) {
            appContext.setLoggedIn(true);
            appContext.setToken(response['access_token']);
            appContext.setSelectedIcon("admin");
            history.push("/admin");     
            return response;
        } else {
            return setErrorMessage(`Error: ${response["message"]}`);
        }
    };

    return (
        <div className="login-container">
            <div className="login-inputs">
                <div className="login-username-input">
                    <label>Username:</label>
                    <input className="login-input-field" value={username} onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className="login-password-input">
                    <label>Password:</label>
                    <input className="login-input-field" value={password} type="password" onChange={e => setPassword(e.target.value)}></input>
                </div>
            </div>
            <button className="admin-login-button" onClick={handleSubmit}>Login</button>
            <div className="login-error-message">{errorMessage}</div>
        </div>
    )
};

export default AdminLogin;