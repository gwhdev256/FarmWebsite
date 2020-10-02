import React, { useState } from 'react';

export const AppContext = React.createContext();

export const ContextProvider = (props) => {
    const [selectedIcon, setSelectedIcon] = useState("home");
    const [apiUrl, setApiUrl] = useState("http://localhost:5000");
    const [homeUrl, setHomeUrl] = useState("http://localhost:3000/");
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    
    const [hayHeader, setHayHeader] = useState(["Hay Type", "Bale Quality", "Availability", "Price/Bale"]);
    const [hayTr1, setHayTr1] = useState(["5% Alfalfa", "No Rain", (5).toFixed(0), "$ "+(125.00).toFixed(2)]);
    const [hayTr2, setHayTr2] = useState(["30% Alfalfa", "No Rain", (39).toFixed(0), "$ "+(120.00).toFixed(2)]);
    const [hayTr3, setHayTr3] = useState(["5% Alfalfa", "Some Rain", (0).toFixed(0), "$ "+(100.00).toFixed(2)]);
    const [hayTr4, setHayTr4] = useState(["30% Alfalfa", "Some Rain", (0).toFixed(0), "$ "+(95.00).toFixed(2)]);
    const [hayTr5, setHayTr5] = useState(["5% Alfalfa", "Heavy Rain", (0).toFixed(0), "$ "+(20.00).toFixed(2)]);
    const [hayTr6, setHayTr6] = useState(["30% Alfalfa", "Heavy Rain", (0).toFixed(0), "$ "+(20.00).toFixed(2)]);

    const [honeyHeader, setHoneyHeader] = useState(["Honey Type", "Honey Size", "Availability", "Price/Unit"]);
    const [honeyTr1, setHoneyTr1] = useState(["Wildflower/Alfalfa", "340ml(12oz)", (6).toFixed(0), "$ "+(10.00).toFixed(2)]);
    const [honeyTr2, setHoneyTr2] = useState(["Wildflower/Alfalfa", "500ml(17.6oz)", (0).toFixed(0), "$ "+(15.00).toFixed(2)]);

    const selectedElement = (event) => {
        setSelectedIcon(event.target.name);
    }

    const handleOnChange = (event) => {
        let currentArray = eval(event.target.alt);
        let currArrIndex = Number(event.target.className);
        currentArray[currArrIndex] = event.target.value;
        eval(event.target.name)(currentArray);
    }

    
    return (
        <AppContext.Provider
        value={{
            hayHeader,
            setHayHeader,
            hayTr1,
            setHayTr1,
            hayTr2,
            setHayTr2,
            hayTr3,
            setHayTr3,
            hayTr4,
            setHayTr4,
            hayTr5,
            setHayTr5,
            hayTr6,
            setHayTr6,
            honeyHeader,
            setHoneyHeader,
            honeyTr1,
            setHoneyTr1,
            honeyTr2,
            setHoneyTr2,
            selectedIcon,
            setSelectedIcon,
            selectedElement,
            handleOnChange,
            apiUrl,
            setApiUrl,
            homeUrl,
            setHomeUrl,
            loggedIn,
            setLoggedIn,
            token,
            setToken
        }}>
            {props.children}
        </AppContext.Provider>
    )
};