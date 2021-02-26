import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';

const AdminApp = () => {
    const appContext = React.useContext(AppContext);
    
    const [hayData, setHayData] = useState([]);
    const [honeyData, setHoneyData] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [stateToggle, setStateToggle] = useState(true);

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

    const deleteModeToggle = () => {
        deleteMode ? setDeleteMode(false) : setDeleteMode(true);
    };

    const stateToggleFunc = () => {
        stateToggle ? setStateToggle(false) : setStateToggle(true);
    };

    const hayChangeHandler = (event) => {
        let currentData = prevHayRef.current;
        let currentRow = event.target.name;
        let currentField = event.target.className;

        if (currentField === ("Quantity" || "Price")) {
            currentData[currentRow][currentField] = Number(event.target.value);
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
            currentData[currentRow][currentField] = Number(event.target.value);
        }
        setHoneyData(currentData);
        stateToggleFunc();
    };

    const saveChanges = () => {
        // step 1 - identify which fields have changed and which ones, if any, were added
        // step 2 - create loop with if statement to cycle through the changed/added rows and 
        //      fire a put or post. 
        // step 3 - set up authentication to make sure specific values such as "No Rain" are spelled
        //      and formatted correctly before firing api puts/posts.
        // step 4 - set up error handling so that we can identify which api calls failed when any do fail
        //      and to give user information on failures.
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
                            hayChanges.push({hayRow: i, rowData: hayData[i]});
                        } else {
                            console.log(hayData[i]["BaleQuality"])
                            console.log("BaleQuality must be No Rain, Some Rain, or Heavy Rain")
                        }
                    } else {
                        console.log(hayData[i])
                        console.log(resetHayData[i])
                    }
                } else {
                    if (hayData[i]["HayType"] !== "") {
                        if (hayData[i]["BaleQuality"] === "No Rain" || hayData[i]["BaleQuality"] === "Some Rain" || hayData[i]["BaleQuality"] === "Heavy Rain") {
                            console.log(hayData[i]["BaleQuality"])
                            hayChanges.push({hayRow: i, rowData: hayData[i]})
                        } else {
                            console.log("BaleQuality must be No Rain, Some Rain, or Heavy Rain")
                        }
                    } else {
                        console.log("HayType cannot be left blank.")
                    }
                }
            }
            console.log(hayChanges)     
        }

        const honeyLoop = () => {
            let honeyChanges = [];
            
            let i;
            for (i = 0; i < honeyData.length; i++) {
                if (honeyData[i]["HoneyType"] === "") {
                    console.log("HoneyType can not be left blank.")
                } else if (isNaN(honeyData[i]["HoneySize"]) || honeyData[i]["HoneySize"] <= 0) {
                    console.log("HoneySize must be a number greater than 0.")
                } else if (isNaN(honeyData[i]["Quantity"]) || honeyData[i]["Quantity"] < 0) {
                    console.log("Quantity must be a number greater than or equal to 0.")
                } else if (isNaN(honeyData[i]["Price"]) || honeyData[i]["Price"] < 0) {
                    console.log("Price must be a number greater than or equal to 0.")
                } else if (honeyData[i]["HoneyType"] !== resetHoneyData[i]["HoneyType"] || honeyData[i]["HoneySize"] !== resetHoneyData[i]["HoneySize"] || honeyData[i]["Quantity"] !== resetHoneyData[i]["Quantity"] || honeyData[i]["Price"] !== resetHoneyData[i]["Price"]) {
                    honeyChanges.push({honeyRow: i, rowData: honeyData[i]});
                } else {
                    console.log(honeyData[i])
                    console.log(resetHoneyData[i])
                }
            }
            console.log(honeyChanges)
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
    }

    const resetHoney = async () => {
        const response = await fetch(`${appContext.apiUrl}honeylist`);
        const { honey } = await response.json();
        setHoneyData(honey);
        prevHoneyRef.current = honey;
    }
    
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
        console.log(message);
        resetHay();
    }

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
                <Td key={`${i}3`}>{"$ "+(tr.Price).toFixed(2)}</Td>
                <Td key={`${i}4`}><button name={i} onClick={(event) => deleteHayRow(event)}>Delete</button></Td>
            </Tr>
        )
    })
    
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

    const addHayRow = () => {
        const newHayRow = {"HayType": "", "BaleQuality": "", "Quantity": 0, "Price": 0};
        const newHayData = [...prevHayRef.current, newHayRow];
        setHayData(newHayData);
        prevHayRef.current = newHayData;
    }

    const addHoneyRow = () => {
        const newHoneyRow = {"HoneyType": "", "HoneySize": "", "Quantity": 0, "Price": 0};
        const newHoneyData = [...prevHoneyRef.current, newHoneyRow];
        setHoneyData(newHoneyData);
        prevHoneyRef.current = newHoneyData;
    }


    return (
        <div className="admin-app">
            <div className="delete-mode-toggle-button">
                {deleteMode 
                    ? <button onClick={deleteModeToggle}>Enter Edit Mode</button> 
                    : <button onClick={deleteModeToggle}>Enter Delete Mode</button>
                }
            </div>
            <div className="delete-mode-warning">
                {deleteMode ? null : "Any unsaved changes will be cancelled when entering delete mode."}
            </div>
            <h1 className="admin-hay-header">Hay Table</h1>
            <Table>
                <Thead>
                    <Tr>
                        <Th className="hay-table-header">{appContext.hayHeader[0]}</Th>
                        <Th className="hay-table-header">{appContext.hayHeader[1]}</Th>
                        <Th className="hay-table-header">{appContext.hayHeader[2]}</Th>
                        <Th className="hay-table-header">{appContext.hayHeader[3]}</Th>
                    </Tr>
                </Thead>
                <Tbody className={deleteMode ? "admin-delete-hay-table" : "admin-edit-hay-table"}>
                    {deleteMode ? deleteHayTable : editHayTable}
                </Tbody>
            </Table>
            <div>
                {deleteMode ? null : <button onClick={addHayRow}>Add Hay Row</button>}
            </div>
            <h2 className="admin-honey-header">Honey Table</h2>
            <Table>
                <Thead>
                    <Tr>
                        <Th className="honey-table-header">{appContext.honeyHeader[0]}</Th>
                        <Th className="honey-table-header">{appContext.honeyHeader[1]}</Th>
                        <Th className="honey-table-header">{appContext.honeyHeader[2]}</Th>
                        <Th className="honey-table-header">{appContext.honeyHeader[3]}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                   {editHoneyTable}
                </Tbody>
            </Table>
            <div>
                {deleteMode ? null : <button onClick={addHoneyRow}>Add Honey Row</button>}
            </div>
            <div className="admin-buttons-container">
                {deleteMode ? null : <button className="save-changes-button" onClick={saveChanges}>Save Changes</button>}
                {deleteMode ? null : <button className="cancel-changes-button" onClick={cancelChanges}>Cancel Changes</button>}
            </div>
        </div>
    )
}

export default AdminApp;