import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';
import { Ellipsis } from 'react-spinners-css';

const AdminApp = () => {
    const appContext = React.useContext(AppContext);
    
    const [hayData, setHayData] = useState([]);
    const [honeyData, setHoneyData] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [stateToggle, setStateToggle] = useState(true);
    const [loaded, setLoaded] = useState(false);

    const prevHayRef = useRef();
    const prevHoneyRef = useRef();

    const resetHayRef = useRef();
    const resetHoneyRef = useRef();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        
        const initialLoad = async() => {    
            await appContext.setSelectedIcon("admin");
            const hayLoader = async () => {
                try {
                    const response = await fetch(`${appContext.apiUrl}haylist`, {signal});
                    const { hay } = await response.json();
                    setHayData(hay);
                    prevHayRef.current = hay;
                    resetHayRef.current = hay;
                } catch(err) {
                    if (err.name === 'AbortError') {
                        return "Fetch aborted";
                    } else {
                        console.error('Error:', err);
                    }
                }
            }
            const honeyLoader = async () => {
                try {
                    const response = await fetch(`${appContext.apiUrl}honeylist`, {signal});
                    const { honey } = await response.json();
                    setHoneyData(honey);
                    prevHoneyRef.current = honey;
                    resetHoneyRef.current = honey;
                    setLoaded(true);
                } catch(err) {
                    if (err.name === 'AbortError') {
                        return "Fetch aborted";
                    } else {
                        console.error('Error:', err);
                    }
                }
            }
            hayLoader();
            honeyLoader();
        }
        initialLoad();
        return function cleanup() {
            controller.abort();
        }
    }, [appContext]);

    const deleteModeToggle = async () => {
        setLoaded(false);
        try {
            const response = await fetch(`${appContext.apiUrl}haylist`);
            const { hay } = await response.json();
            setHayData(hay);
            prevHayRef.current = hay;
            resetHayRef.current = hay;
        } catch(err) {
            console.error('Error:', err);
        }
        try {
            const response = await fetch(`${appContext.apiUrl}honeylist`);
            const { honey } = await response.json();
            setHoneyData(honey);
            prevHoneyRef.current = honey;
            resetHoneyRef.current = honey;
        } catch(err) {
            console.error('Error:', err);
        }
        deleteMode ? setDeleteMode(false) : setDeleteMode(true);
        setLoaded(true);
    };

    const stateToggleFunc = () => {
        stateToggle ? setStateToggle(false) : setStateToggle(true);
    };

    const hayChangeHandler = (event) => {
        let currentData = prevHayRef.current;
        let currentRow = event.target.name;
        let currentField = event.target.className;

        if (currentField === ("Quantity" || "Price")) {
            currentData[currentRow][currentField] = event.target.value;
        } else {
            currentData[currentRow][currentField] = String(event.target.value);
        }
        setHayData(currentData);
        stateToggleFunc();
    };

    const honeyChangeHandler = (event) => {
        let currentData = prevHoneyRef.current;
        let currentRow = event.target.name;
        let currentField = event.target.className;

        if (currentField === ("HoneyType")) {
            currentData[currentRow][currentField] = String(event.target.value);
        } else {
            currentData[currentRow][currentField] = event.target.value;
        }
        setHoneyData(currentData);
        stateToggleFunc();
    };

    const saveChanges = () => {
        let resetHayData = {"HayType": "", "BaleQuality": "", "Quantity": 0, "Price": 0}
        let resetHoneyData = {"HoneyType": "", "HoneySize": 0, "Quantity": 0, "Price": 0}

        const fetchHay = async () => {
            const response = await fetch(`${appContext.apiUrl}haylist`);
            const { hay } = await response.json();
            resetHayData = hay;
            hayLoop();
        }

        const fetchHoney = async () => {
            const response = await fetch(`${appContext.apiUrl}honeylist`);
            const { honey } = await response.json();
            resetHoneyData = honey;
            honeyLoop();
        }
        
        const hayLoop = () => {
            let hayChanges = [];
            
            let i;
            for (i = 0; i < hayData.length; i++) {
                if (resetHayData[i]) {
                    if (hayData[i]["HayType"] !== resetHayData[i]["HayType"] || hayData[i]["BaleQuality"] !== resetHayData[i]["BaleQuality"] || hayData[i]["Quantity"] !== resetHayData[i]["Quantity"] || hayData[i]["Price"] !== resetHayData[i]["Price"]) {
                        if (hayData[i]["BaleQuality"] === "No Rain" || hayData[i]["BaleQuality"] === "Some Rain" || hayData[i]["BaleQuality"] === "Heavy Rain") {
                            hayChanges.push({"HayType": resetHayData[i]["HayType"], "BaleQuality": resetHayData[i]["BaleQuality"], "Quantity": hayData[i]["Quantity"], "Price": hayData[i]["Price"], "NewHayType": hayData[i]["HayType"], "NewBaleQuality": hayData[i]["BaleQuality"]});
                        } else {
                            console.log("BaleQuality must be No Rain, Some Rain, or Heavy Rain")
                        }
                    }
                } else {
                    if (hayData[i]["HayType"] !== "") {
                        if (hayData[i]["BaleQuality"] === "No Rain" || hayData[i]["BaleQuality"] === "Some Rain" || hayData[i]["BaleQuality"] === "Heavy Rain") {
                            hayChanges.push(hayData[i])
                        } else {
                            console.log("BaleQuality must be No Rain, Some Rain, or Heavy Rain")
                        }
                    } else {
                        console.log("HayType cannot be left blank.")
                    }
                }
            }

            const hayFetchPut = async (change) => {
                const response = await fetch(`${appContext.apiUrl}createhay`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${appContext.token}`
                    },
                    body: JSON.stringify(change)
                });
                const message = await response.json();
                console.log(message)                              
            }
            
            if (hayChanges !== []) {
                hayChanges.forEach(hayFetchPut);
            }
        }

        const honeyLoop = () => {
            let honeyChanges = [];
            
            let i;
            for (i = 0; i < honeyData.length; i++) {
                if (honeyData[i]["HoneyType"] === "") {
                    console.log("HoneyType cannot be left blank.")
                } else if (isNaN(honeyData[i]["HoneySize"]) || honeyData[i]["HoneySize"] <= 0) {
                    console.log("HoneySize must be a number greater than 0.")
                } else if (isNaN(honeyData[i]["Quantity"]) || honeyData[i]["Quantity"] < 0) {
                    console.log("Quantity must be a number greater than or equal to 0.")
                } else if (isNaN(honeyData[i]["Price"]) || honeyData[i]["Price"] < 0) {
                    console.log("Price must be a number greater than or equal to 0.")
                } else if (resetHoneyData[i]) {
                    if (honeyData[i]["HoneyType"] !== resetHoneyData[i]["HoneyType"] || honeyData[i]["HoneySize"] !== resetHoneyData[i]["HoneySize"] || honeyData[i]["Quantity"] !== resetHoneyData[i]["Quantity"] || honeyData[i]["Price"] !== resetHoneyData[i]["Price"]) {
                        honeyChanges.push({"HoneyType": resetHoneyData[i]["HoneyType"], "HoneySize": resetHoneyData[i]["HoneySize"], "Quantity": honeyData[i]["Quantity"], "Price": honeyData[i]["Price"], "NewHoneyType": honeyData[i]["HoneyType"], "NewHoneySize": honeyData[i]["HoneySize"]});
                    }
                } else {
                    honeyChanges.push(honeyData[i]);
                }
            }

            const honeyFetchPut = async (change) => {
                const response = await fetch(`${appContext.apiUrl}createhoney`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${appContext.token}`
                    },
                    body: JSON.stringify(change)
                });
                console.log(response.json())
            }

            honeyChanges.forEach(honeyFetchPut);
        }

        fetchHay();
        fetchHoney();
        // try {
        //     const response = await fetch(``)
        // } catch(err){
        //     console.log(err);
        // }
    };

    const resetHay = async () => {
        const response = await fetch(`${appContext.apiUrl}haylist`);
        const { hay } = await response.json();
        setHayData(hay);
        prevHayRef.current = hay;
    };

    const resetHoney = async () => {
        const response = await fetch(`${appContext.apiUrl}honeylist`);
        const { honey } = await response.json();
        setHoneyData(honey);
        prevHoneyRef.current = honey;
    };
    
    const cancelChanges = () => {
        resetHay();
        resetHoney();
    };

    const deleteHayRow = async (event) => {
        const rowIndex = event.target.name;
        const dbRowId = hayData[rowIndex].id;
        const response = await fetch(`${appContext.apiUrl}hay/${dbRowId}`, {
            method: "DELETE", 
            headers: {
                "Authorization": `Bearer ${appContext.token}`
            },
        });
        const message = await response.json();
        if (message.msg === "Token has expired") {
            return appContext.setLoggedIn(false);
        } else {
            console.log(message);
        }
        resetHay();
    };

    const deleteHoneyRow = async (event) => {
        const rowIndex = event.target.name;
        const dbRowId = hayData[rowIndex].id;
        const response = await fetch(`${appContext.apiUrl}honey/${dbRowId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${appContext.token}`
            },
        });
        const message = await response.json();
        if (message.msg === "Token has expired") {
            return appContext.setLoggedIn(false);
        } else {
            console.log(message);
        }
        resetHoney();
    };

    const editHayTable = hayData.map((tr, i) => {
        return (
            <Tr key={`${i}row`} className="tr">
                <Td><input value={tr.HayType} name={i} key={`${i}0`} className="HayType" onChange={(event) => hayChangeHandler(event)}></input></Td>
                <Td><input value={tr.BaleQuality} name={i} key={`${i}1`} className="BaleQuality" onChange={(event) => hayChangeHandler(event)}></input></Td>
                <Td><input value={tr.Quantity} name={i} key={`${i}2`} className="Quantity" onChange={(event) => hayChangeHandler(event)}></input></Td>
                <Td><input value={tr.Price} name={i} key={`${i}3`} className="Price" onChange={(event) => hayChangeHandler(event)}></input></Td>
            </Tr>
        )
    });

    const deleteHayTable = hayData.map((tr, i) => {
        return (
            <Tr key={`${i}row`} className="tr">
                <Td key={`${i}0`}>{tr.HayType}</Td>
                <Td key={`${i}1`}>{tr.BaleQuality}</Td>
                <Td key={`${i}2`}>{tr.Quantity}</Td>
                <Td key={`${i}3`}>{tr.Price}</Td>
                <Td key={`${i}4`}><button name={i} onClick={(event) => deleteHayRow(event)}>Delete</button></Td>
            </Tr>
        )
    });
    
    const editHoneyTable = honeyData.map((tr, i) => {
        return (
            <Tr key={`${i}row`} className="tr">
                <Td className="honey-type-td"><input value={tr.HoneyType} name={i} key={`${i}0`} className="HoneyType" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr.HoneySize} name={i} key={`${i}1`} className="HoneySize" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr.Quantity} name={i} key={`${i}2`} className="Quantity" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr.Price} name={i} key={`${i}3`} className="Price" onChange={(event) => honeyChangeHandler(event)}></input></Td>
            </Tr>
        ) 
    });

    const deleteHoneyTable = honeyData.map((tr, i) => {
        return (
            <Tr key={`${i}row`} className="honey-tr">
                <Td className="honey-type-td" key={`${i}0`}>{tr.HoneyType}</Td>
                <Td className="honey-td" key={`${i}1`}>{tr.HoneySize}</Td>
                <Td className="honey-td" key={`${i}2`}>{tr.Quantity}</Td>
                <Td className="honey-td" key={`${i}3`}>{tr.Price}</Td>
                <Td className="honey-td" key={`${i}4`}><button name={i} onClick={(event) => deleteHoneyRow(event)}>Delete</button></Td>
            </Tr>
        )
    });

    const addHayRow = () => {
        const newHayRow = {"HayType": "", "BaleQuality": "", "Quantity": 0, "Price": 0};
        const newHayData = [...prevHayRef.current, newHayRow];
        setHayData(newHayData);
        prevHayRef.current = newHayData;
    };

    const addHoneyRow = () => {
        const newHoneyRow = {"HoneyType": "", "HoneySize": "", "Quantity": 0, "Price": 0};
        const newHoneyData = [...prevHoneyRef.current, newHoneyRow];
        setHoneyData(newHoneyData);
        prevHoneyRef.current = newHoneyData;
    };


    return (
        <div className="admin-app">
            <div className="delete-mode-toggle-button">
                { deleteMode 
                    ? <button onClick={deleteModeToggle}>Enter Edit Mode</button> 
                    : <button onClick={deleteModeToggle}>Enter Delete Mode</button>
                }
            </div>
            <div className="delete-mode-warning">
                { deleteMode ? null : "Be Advised: Any unsaved changes will be cancelled when entering delete mode." }
            </div>
            <h1 className="admin-hay-header">Hay Table</h1>
            { loaded
                ?   <Table>
                        <Thead>
                            <Tr>
                                <Th className="hay-table-header">{appContext.hayHeader[0]}</Th>
                                <Th className="hay-table-header">{appContext.hayHeader[1]}</Th>
                                <Th className="hay-table-header">{appContext.hayHeader[2]}</Th>
                                <Th className="hay-table-header">{appContext.hayHeader[3]}</Th>
                            </Tr>
                        </Thead>
                        <Tbody className={ deleteMode ? "admin-delete-hay-table" : "admin-edit-hay-table" }>
                            { deleteMode ? deleteHayTable : editHayTable }
                        </Tbody>
                    </Table>
                :   <div className="spinner"><Ellipsis color="whitesmoke"/></div>
            }
            <div>
                { deleteMode ? null : <button onClick={addHayRow}>Add Hay Row</button> }
            </div>
            <h2 className="admin-honey-header">Honey Table</h2>
            { loaded
                ?   <Table>
                        <Thead>
                            <Tr>
                                <Th className="honey-table-header">{appContext.honeyHeader[0]}</Th>
                                <Th className="honey-table-header">{`${appContext.honeyHeader[1]} (ml)`}</Th>
                                <Th className="honey-table-header">{appContext.honeyHeader[2]}</Th>
                                <Th className="honey-table-header">{appContext.honeyHeader[3]}</Th>
                            </Tr>
                        </Thead>
                        <Tbody className={deleteMode ? "admin-delete-honey-table" : "admin-edit-honey-table"}>
                        { deleteMode ? deleteHoneyTable : editHoneyTable }
                        </Tbody>
                    </Table>
                : <div className="spinner"><Ellipsis color="whitesmoke"/></div>
            }
            <div>
                { deleteMode ? null : <button onClick={addHoneyRow}>Add Honey Row</button> }
            </div>
            <div className="admin-buttons-container">
                { deleteMode ? null : <button className="save-changes-button" onClick={saveChanges}>Save Changes</button> }
                { deleteMode ? null : <button className="cancel-changes-button" onClick={cancelChanges}>Cancel Changes</button> }
            </div>
        </div>
    )
}

export default AdminApp;