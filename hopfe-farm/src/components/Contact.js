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

    const createContacts = appContext.contactInfo.map((contact) => {
        return (
            <div className="contact-container">
                <div className="contact-name">{contact.ContactName}</div>
                <div className="contact-title">{contact.JobTitle}</div>
                <div className="contact-number">{contact.PhoneNumber}</div>
                <div className="contact-email">{contact.Email}</div>
            </div>
        )
    })

    return (
        <div className="contact-info">
            {createContacts}
        </div>
    )
}

export default Contact;