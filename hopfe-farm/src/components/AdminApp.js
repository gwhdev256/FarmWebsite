import React, { useState } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';

const AdminApp = () => {
    const appContext = React.useContext(AppContext);
    const [stateToggle, setStateToggle] = useState(0);

    const changeHandler = (event) => {
        appContext.handleOnChange(event);
        setStateToggle(stateToggle + 1);
    }

    const hayTrArr = [appContext.hayTr1, appContext.hayTr2, appContext.hayTr3, appContext.hayTr4, appContext.hayTr5, appContext.hayTr6];
    
    const createHayTr = hayTrArr.map((tr, i) => {
        const trIndex = i + 1;
        const trName = `setHayTr${trIndex}`;
        const trAlt = `hayTr${trIndex}`;
        return (
            <Tr className="tr">
                <Td><input value={tr[0]} name={trName} alt={trAlt} id="0" onChange={(event) => changeHandler(event)}></input></Td>
                <Td><input value={tr[1]} name={trName} alt={trAlt} id="1" onChange={(event) => changeHandler(event)}></input></Td>
                <Td><input value={tr[2]} name={trName} alt={trAlt} id="2" onChange={(event) => changeHandler(event)}></input></Td>
                <Td><input value={tr[3]} name={trName} alt={trAlt} id="3" onChange={(event) => changeHandler(event)}></input></Td>
            </Tr>
        )
    })

    const honeyTrArr = [appContext.honeyTr1, appContext.honeyTr2];

    const createHoneyTr = honeyTrArr.map((tr, i) => {
        const trIndex = i + 1;
        const trName = `setHoneyTr${trIndex}`;
        const trAlt = `honeyTr${trIndex}`;
        return (
            <Tr className="tr">
                <Td className="honey-type-td"><input value={tr[0]} name={trName} alt={trAlt} id="0" onChange={(event) => changeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr[1]} name={trName} alt={trAlt} id="1" onChange={(event) => changeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr[2]} name={trName} alt={trAlt} id="2" onChange={(event) => changeHandler(event)}></input></Td>
                <Td className="honey-td"><input value={tr[3]} name={trName} alt={trAlt} id="3" onChange={(event) => changeHandler(event)}></input></Td>
            </Tr>
        ) 
    })

    return (
        <body className="admin-app">
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
        </body>
    )
}

export default AdminApp;