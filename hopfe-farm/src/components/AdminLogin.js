import React, { useState } from 'react';
import '../App.css';
import { AppContext } from './AppContext.js';

import admin from '../images/padlock.svg';

const AdminLogin = () => {
    const appContext = React.useContext(AppContext);

    return (
        <button className="admin-login-button" name={admin} onClick={(event) => appContext.selectedElement(event)}>Login</button>
    )
}

export default AdminLogin;