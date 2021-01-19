import React, { useState, useEffect } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';

const AdminApp = () => {
    const appContext = React.useContext(AppContext);
    const [hayData, setHayData] = useState(null);
    const [honeyData, setHoneyData] = useState(null);
    const [stateToggle, setStateToggle] = useState(true);

    const setTableStates = () => {
        const currentHayData = appContext.hayTr;
        const currentHoneyData = appContext.honeyTr;
        setHayData(currentHayData);
        setHoneyData(currentHoneyData);
    }

    useEffect(() => {
        setTableStates();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const stateToggleFunc = () => {
        if (stateToggle === true) {
            setStateToggle(false);
        } else {
            setStateToggle(true);
        }
    }

    const hayChangeHandler = (event) => {
        let currentData = hayData;
        let currentArray = event.target.name;
        let currArrIndex = Number(event.target.className);
        currentData[currentArray][currArrIndex] = event.target.value;
        setHayData(currentData);
        stateToggleFunc();
    };

    const honeyChangeHandler = (event) => {
        let currentData = honeyData;
        let currentArray = event.target.name;
        let currArrIndex = Number(event.target.className);
        currentData[currentArray][currArrIndex] = event.target.value;
        setHoneyData(currentData);
        stateToggleFunc();
    };

    console.log(appContext.hayTr);

    // const saveChanges = async() => {
    //     await appContext.setHayTr(hayData);
    //     await appContext.setHoneyTr(honeyData);
    //     console.log(appContext.hayTr)
    // };

    let createHayTr;

    if (hayData !== null) {
        let hayTrArr = hayData;
        createHayTr = 
            hayTrArr.map((tr, i) => {
                return (
                    <Tr key={`${i}row`} className="tr">
                        <Td><input value={tr[0]} name={i} key={`${i}0`} className="0" onChange={(event) => hayChangeHandler(event)}></input></Td>
                        <Td><input value={tr[1]} name={i} key={`${i}1`} className="1" onChange={(event) => hayChangeHandler(event)}></input></Td>
                        <Td><input value={tr[2]} name={i} key={`${i}2`} className="2" onChange={(event) => hayChangeHandler(event)}></input></Td>
                        <Td><input value={tr[3]} name={i} key={`${i}3`} className="3" onChange={(event) => hayChangeHandler(event)}></input></Td>
                    </Tr>
                )
            })
    }
    


    let createHoneyTr;

    if (honeyData !== null) {
        let honeyTrArr = honeyData;
        createHoneyTr = 
            honeyTrArr.map((tr, i) => {
                return (
                    <Tr key={`${i}row`} className="tr">
                        <Td className="honey-type-td"><input value={tr[0]} name={i} key={`${i}0`} className="0" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={tr[1]} name={i} key={`${i}1`} className="1" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={tr[2]} name={i} key={`${i}2`} className="2" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={tr[3]} name={i} key={`${i}3`} className="3" onChange={(event) => honeyChangeHandler(event)}></input></Td>
                    </Tr>
                ) 
            })
    }

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
            <div className="admin-buttons-container">
                {/* <button className="save-changes-button" onClick={saveChanges}>Save Changes</button> */}
                <button className="cancel-changes-button" onClick={setTableStates}>Cancel Changes</button>
            </div>
        </div>
    )
}

export default AdminApp;