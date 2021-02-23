import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';

const AdminApp = () => {
    const appContext = React.useContext(AppContext);
    
    const [hayData, setHayData] = useState([]);
    const [honeyData, setHoneyData] = useState([]);
    const [stateToggle, setStateToggle] = useState(true);

    const prevHayRef = useRef();
    const prevHoneyRef = useRef();

    const resetHayRef = useRef();
    const resetHoneyRef = useRef();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        
        const initialLoad = () => {    
            appContext.setSelectedIcon("admin");
            const hayLoader = async () => {
                try {
                    const response = await fetch(`${appContext.apiUrl}haylist`, {signal});
                    let hayJson = response.json();
                    hayJson.then((result) => {
                        if (result.hay) {
                            setHayData(result.hay);
                            prevHayRef.current = result.hay;
                            resetHayRef.current = result.hay;
                        }
                    })
                } catch(err) {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                    console.error('Error:', err);
                    }
                }
            }
            const honeyLoader = async () => {
                try {
                    const response = await fetch(`${appContext.apiUrl}honeylist`, {signal});
                    let honeyJson = response.json();
                    honeyJson.then((result) => {
                        if (result.honey) {
                            setHoneyData(result.honey);
                            prevHoneyRef.current = result.honey;
                            resetHoneyRef.current = result.honey;
                        }
                    })
                } catch(err) {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                    console.error('Error:', err);
                    }
                }
            }
            hayLoader();
            honeyLoader();
        }
        initialLoad();
        return function cleanup(){
            controller.abort();
        }
    }, [appContext]);



    const stateToggleFunc = () => {
        if (stateToggle === true) {
            setStateToggle(false);
        } else {
            setStateToggle(true);
        }
    };

    const hayChangeHandler = (event) => {
        let currentData = prevHayRef.current;
        let currentRow = event.target.name;
        let currField = event.target.className;
        currentData[currentRow][currField] = event.target.value;
        setHayData(currentData);
        stateToggleFunc();
    };

    const honeyChangeHandler = (event) => {
        let currentData = prevHoneyRef.current;
        let currentArray = event.target.name;
        let currField = event.target.className;
        currentData[currentArray][currField] = event.target.value;
        setHoneyData(currentData);
        stateToggleFunc();
    };

    // const saveChanges = async() => {
        // step 1 - identify which fields have changed and which ones, if any, were added
        // step 2 - create loop with if statement to cycle through the changed/added rows and 
        //      fire a put or post. 
        // step 3 - set up authentication to make sure specific values such as "No Rain" are spelled
        //      and formatted correctly before firing api puts/posts.
        // step 4 - set up error handling so that we can identify which api calls failed when any do fail
        //      and to give user information on failures.
        // try {
        //     const response = await fetch(``)
        // }
    // };

    const cancelChanges = () => {
        setHayData(resetHayRef.current);
        setHoneyData(resetHoneyRef.current);
        prevHayRef.current = resetHayRef.current;
        prevHoneyRef.current = resetHoneyRef.current;
    }

    const createHayTr = hayData.map((tr, i) => {
        return (
            <Tr key={`${i}row`} className="tr">
                <Td><input value={tr.HayType} name={i} key={`${i}0`} className="HayType" onChange={(event) => hayChangeHandler(event)}></input></Td>
                <Td><input value={tr.BaleQuality} name={i} key={`${i}1`} className="BaleQuality" onChange={(event) => hayChangeHandler(event)}></input></Td>
                <Td><input value={tr.Quantity} name={i} key={`${i}2`} className="Quantity" onChange={(event) => hayChangeHandler(event)}></input></Td>
                <Td><input value={tr.Price} name={i} key={`${i}3`} className="Price" onChange={(event) => hayChangeHandler(event)}></input></Td>
            </Tr>
        )
    });

    const addHayRow = () => {
        const newHayRow = {HayType: "", BaleQuality: "", Quantity: 0, Price: 0};
        const newHayData = [...prevHayRef.current, newHayRow];
        setHayData(newHayData);
        prevHayRef.current = newHayData;
    }

    const addHoneyRow = () => {
        const newHoneyRow = {HoneyType: "", HoneySize: "", Quantity: 0, Price: 0};
        const newHoneyData = [...prevHoneyRef.current, newHoneyRow];
        setHoneyData(newHoneyData);
        prevHoneyRef.current = newHoneyData;
    }

    const createHoneyTr = honeyData.map((tr, i) => {
        return (
            <Tr key={`${i}row`} className="tr">
                <Td className="honey-type-td"><input value={tr.HoneyType} name={i} key={`${i}0`} className="HoneyType" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr.HoneySize} name={i} key={`${i}1`} className="HoneySize" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr.Quantity} name={i} key={`${i}2`} className="Quantity" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr.Price} name={i} key={`${i}3`} className="Price" onChange={(event) => honeyChangeHandler(event)}></input></Td>
            </Tr>
        ) 
    });

    return (
        <div className="admin-app">
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
                <Tbody>
                    {createHayTr}
                </Tbody>
            </Table>
            <div>
                <button onClick={addHayRow}>Add Hay Row</button>
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
                   {createHoneyTr}
                </Tbody>
            </Table>
            <div>
                <button onClick={addHoneyRow}>Add Honey Row</button>
            </div>
            <div className="admin-buttons-container">
                {/* <button className="save-changes-button" onClick={saveChanges}>Save Changes</button> */}
                <button className="cancel-changes-button" onClick={cancelChanges}>Cancel Changes</button>
            </div>
        </div>
    )
}

export default AdminApp;