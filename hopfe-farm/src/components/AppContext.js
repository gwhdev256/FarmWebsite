import React, { useState } from 'react';
import App from '../App.js';

import home from '../images/home.svg';
import hay from '../images/hay.svg';
import honey from '../images/honey.svg';
import contact from '../images/contact.svg';

export const AppContext = React.createContext();

export const ContextProvider = () => {
    const [selectedIcon, setSelectedIcon] = useState(home);
    const [hayHeader, setHayHeader] = useState(["Hay Type", "Bale Quality", "Quantity", "Price/Bale"]);
    const [hayTr1, setHayTr1] = useState(["5% Alfalfa", "No Rain", (5).toFixed(0), "$ "+(125.00).toFixed(2)]);
    const [hayTr2, setHayTr2] = useState(["30% Alfalfa", "No Rain", (39).toFixed(0), "$ "+(120.00).toFixed(2)]);
    const [hayTr3, setHayTr3] = useState(["5% Alfalfa", "Some Rain", (0).toFixed(0), "$ "+(100.00).toFixed(2)]);
    const [hayTr4, setHayTr4] = useState(["30% Alfalfa", "Some Rain", (0).toFixed(0), "$ "+(95.00).toFixed(2)]);
    const [hayTr5, setHayTr5] = useState(["5% Alfalfa", "Heavy Rain", (0).toFixed(0), "$ "+(20.00).toFixed(2)]);
    const [hayTr6, setHayTr6] = useState(["30% Alfalfa", "Heavy Rain", (0).toFixed(0), "$ "+(20.00).toFixed(2)]);

    const [honeyHeader, setHoneyHeader] = useState(["Honey Type", "Honey Size", "Quantity", "Price/Unit"]);
    const [honeyTr1, setHoneyTr1] = useState(["Wildflower/Alfalfa", "340ml(12oz)", (6).toFixed(0), "$ "+(10.00).toFixed(2)]);
    const [honeyTr2, setHoneyTr2] = useState(["Wildflower/Alfalfa", "500ml(17.6oz)", (0).toFixed(0), "$ "+(15.00).toFixed(2)]);

    const selectedElement = (event) => {
        setSelectedIcon(event.target.name);
    }

    const handleOnChange = (event) => {
        let currentArray = eval(event.target.alt);
        let id = Number(event.target.id);
        currentArray[id] = event.target.value;
        eval(event.target.name)(currentArray);
    }

    const setIcon = (icon) => {
        setSelectedIcon(icon);
    }
    
    return (
        <AppContext.Provider
        value={{
            hayHeader: hayHeader,
            setHayHeader: setHayHeader,
            hayTr1: hayTr1,
            setHayTr1: setHayTr1,
            hayTr2: hayTr2,
            setHayTr2: setHayTr2,
            hayTr3: hayTr3,
            setHayTr3: setHayTr3,
            hayTr4: hayTr4,
            setHayTr4: setHayTr4,
            hayTr5: hayTr5,
            setHayTr5: setHayTr5,
            hayTr6: hayTr6,
            setHayTr6: setHayTr6,
            honeyHeader: honeyHeader,
            setHoneyHeader: setHoneyHeader,
            honeyTr1: honeyTr1,
            setHoneyTr1: setHoneyTr1,
            honeyTr2: honeyTr2,
            setHoneyTr2: setHoneyTr2,
            selectedIcon: selectedIcon,
            setSelectedIcon: setSelectedIcon,
            selectedElement: selectedElement,
            handleOnChange: handleOnChange,
            setIcon: setIcon,
        }}>
            <App />
        </AppContext.Provider>
    )
};