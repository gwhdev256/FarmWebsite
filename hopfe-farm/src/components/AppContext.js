import React, { useState } from 'react';
import App from '../App.js';

export const AppContext = React.createContext();

export const ContextProvider = () => {
    const [hayHeader, setHayHeader] = useState(["Hay Type", "Bale Quality", "Quantity", "Price/Bale"]);
    const [hayTr1, setHayTr1] = useState(["5% Alfalfa", "No Rain", (5).toFixed(0), "$ "+(125.00).toFixed(2)]);
    const [hayTr2, setHayTr2] = useState(["30% Alfalfa", "No Rain", (39).toFixed(0), "$ "+(120.00).toFixed(2)]);
    const [hayTr3, setHayTr3] = useState(["5% Alfalfa", "Some Rain", (0).toFixed(0), "$ "+(110.00).toFixed(2)]);
    const [hayTr4, setHayTr4] = useState(["30% Alfalfa", "Some Rain", (0).toFixed(0), "$ "+(105.00).toFixed(2)]);
    const [hayTr5, setHayTr5] = useState(["5% Alfalfa", "Heavy Rain", (0).toFixed(0), "$  "+(35.00).toFixed(2)]);
    const [hayTr6, setHayTr6] = useState(["30% Alfalfa", "Heavy Rain", (0).toFixed(0), "$  "+(35.00).toFixed(2)]);

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
        }}>
            <App />
        </AppContext.Provider>
    )
};