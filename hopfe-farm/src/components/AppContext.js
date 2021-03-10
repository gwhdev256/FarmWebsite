import React, { useState } from 'react';

export const AppContext = React.createContext();

export const ContextProvider = (props) => {
    const [selectedIcon, setSelectedIcon] = useState("home");
    const [apiUrl, setApiUrl] = useState("http://localhost:5000/");
    const [homeUrl, setHomeUrl] = useState("http://localhost:3000/");
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    
    const [hayHeader, setHayHeader] = useState(["Hay Type", "Bale Quality", "Availability", "Price/Bale"]);
    const [hayTr, setHayTr] = useState([]);

    const [honeyHeader, setHoneyHeader] = useState(["Honey Type", "Honey Size", "Availability", "Price/Unit"]);
    const [honeyTr, setHoneyTr] = useState([]);

    const [contactInfo, setContactInfo] = useState([]);
    

    const hayTrLoader = async () => {
        const response = await fetch(`${apiUrl}haylist`);
        const { hay } = await response.json();
        setHayTr(hay);
    };

    const honeyTrLoader = async () => {
        const response = await fetch(`${apiUrl}honeylist`);
        const { honey } = await response.json();
        setHoneyTr(honey);
    };

    const contactInfoLoader = async () => {
        const response = await fetch(`${apiUrl}contactList`);
        const { contacts } = await response.json();
        setContactInfo(contacts);
    };

    
    return (
        <AppContext.Provider
        value={{
            hayHeader,
            setHayHeader,
            hayTr,
            setHayTr,
            honeyHeader,
            setHoneyHeader,
            honeyTr,
            setHoneyTr,
            contactInfo,
            setContactInfo,
            selectedIcon,
            setSelectedIcon,
            apiUrl,
            setApiUrl,
            homeUrl,
            setHomeUrl,
            loggedIn,
            setLoggedIn,
            token,
            setToken,
            hayTrLoader,
            honeyTrLoader,
            contactInfoLoader
        }}>
            {props.children}
        </AppContext.Provider>
    )
};