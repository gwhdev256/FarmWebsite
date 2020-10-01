import React, { useEffect } from 'react';
import '../App.css';
import { AppContext } from './AppContext.js';

const Contact = () => {
    const appContext = React.useContext(AppContext);

    useEffect(() => {
        appContext.setSelectedIcon("contact");
    });

    return (
        <div className="contact-info">
            Garth Hopfe
        </div>
    )
}

export default Contact;