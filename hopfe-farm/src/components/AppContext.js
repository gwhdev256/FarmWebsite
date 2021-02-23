import React, { useState } from 'react';

export const AppContext = React.createContext();

export const ContextProvider = (props) => {
    const [selectedIcon, setSelectedIcon] = useState("home");
    const [apiUrl, setApiUrl] = useState("http://localhost:5000/");
    const [homeUrl, setHomeUrl] = useState("http://localhost:3000/");
    const [loggedIn, setLoggedIn] = useState(true);
    const [token, setToken] = useState(null);
    
    const [hayHeader, setHayHeader] = useState(["Hay Type", "Bale Quality", "Availability", "Price/Bale"]);
    const [hayTr, setHayTr] = useState([]);

    const [honeyHeader, setHoneyHeader] = useState(["Honey Type", "Honey Size", "Availability", "Price/Unit"]);
    const [honeyTr, setHoneyTr] = useState([]);

    const [contactInfo, setContactInfo] = useState([]);
    

    const hayTrLoader = async () => {
        const response = await fetch(`${apiUrl}haylist`);
        let hayJson = response.json()
        hayJson.then((result) => {
            if (result.hay) {
                setHayTr(result.hay);
            }
        })
    };

    const honeyTrLoader = async () => {
        const response = await fetch(`${apiUrl}honeylist`);
        let honeyJson = response.json()
        honeyJson.then((result) => {
            if (result.honey) {
                setHoneyTr(result.honey);
            }
        })
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
            honeyTrLoader
        }}>
            {props.children}
        </AppContext.Provider>
    )
};