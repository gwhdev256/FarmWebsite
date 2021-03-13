import React, { useEffect, useState } from 'react';
import '../App.css';
import { AppContext } from './AppContext.js';
import { Ellipsis } from 'react-spinners-css';

const Contact = () => {
    const appContext = React.useContext(AppContext);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const initialLoad = () => {
            appContext.setSelectedIcon("contact");
            appContext.contactInfoLoader();
            setLoaded(true);
        }
        initialLoad();
        // eslint-disable-next-line
    }, []);

    const createContacts = appContext.contactInfo.map((contact) => {
        return (
            <div key={`${contact.ContactName}`} className="contact-container">
                <div key={`${contact.ContactName}0`} className="contact-name">{contact.ContactName}</div>
                <div key={`${contact.ContactName}1`} className="contact-title">{contact.JobTitle}</div>
                <div key={`${contact.ContactName}2`} className="contact-number">{contact.PhoneNumber}</div>
                <div key={`${contact.ContactName}3`} className="contact-email">{contact.Email}</div>
            </div>
        )
    })

    return (
        <div className="contact-info">
            {loaded ? createContacts : <div className="spinner"><Ellipsis color="whitesmoke"/></div>}
        </div>
    )
}

export default Contact;