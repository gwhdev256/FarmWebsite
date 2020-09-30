import React, { useState } from 'react';
import '../App.css';
import { AppContext } from './AppContext.js';

import admin from '../images/padlock.svg';
import { fetchFunc } from './Fetch.js';

const AdminLogin = () => {
    const appContext = React.useContext(AppContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async(name) => {
        let res = await fetchFunc(`${appContext.url}/login`, 'POST', {"username": `${username}`, "password": `${password}`})
        console.log(res)
        if (res['access_token']) {
            appContext.setLoggedIn(true);
            appContext.setSelectedIcon(name);
            return res
        } else {
            return setErrorMessage(`Error: ${res["message"]}`);
        }
    };

    return (
        <div>
            <label>Username:</label>
            <input value={username} onChange={e => setUsername(e.target.value)}></input>
            <label>Password:</label>
            <input value={password} type="password" onChange={e => setPassword(e.target.value)}></input>
            <button className="admin-login-button" name={admin} onClick={(event) => handleSubmit(event.name)}>Login</button>
            <div className="login-error-message">{errorMessage}</div>
        </div>
    )
};

export default AdminLogin;