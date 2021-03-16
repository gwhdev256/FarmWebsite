import React, { useState, useEffect } from 'react';
import '../App.css';
import { AppContext } from './AppContext.js';
import { useHistory } from 'react-router-dom';

import { fetchFunc } from './Fetch.js';

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
        let res = await fetchFunc(`${appContext.apiUrl}/login`, 'POST', {"username": `${username}`, "password": `${password}`})
        setUsername("");
        setPassword("");
        if (res['access_token']) {
            appContext.setLoggedIn(true);
            appContext.setToken(res['access_token']);
            appContext.setSelectedIcon("admin");
            history.push("/admin");     
            return res;
        } else {
            return setErrorMessage(`Error: ${res["message"]}`);
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