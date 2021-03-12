import React, { useEffect } from 'react';
import '../App.css';
import { AppContext } from './AppContext.js';

const Contact = () => {
    const appContext = React.useContext(AppContext);

    useEffect(() => {
        const initialLoad = () => {
            appContext.setSelectedIcon("contact");
            appContext.contactInfoLoader();
        }
        initialLoad();
    }, [appContext]);

    const createContacts = appContext.contactInfo.map(() => {
        //maybe forEach loop? extract all contact data and display it
    })

    return (
        <div className="contact-info">
            {createContacts}
        </div>
    )
}

export default Contact;