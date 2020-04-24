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
                    <Tr className="tr">
                        <Td><input value={appContext.hayTr1[0]} name="setHayTr1" alt="hayTr1" id="0" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr1[1]} name="setHayTr1" alt="hayTr1" id="1" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr1[2]} name="setHayTr1" alt="hayTr1" id="2" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr1[3]} name="setHayTr1" alt="hayTr1" id="3" onChange={(event) => changeHandler(event)}></input></Td>
                    </Tr>
                    <Tr className="tr">
                        <Td><input value={appContext.hayTr2[0]} name="setHayTr2" alt="hayTr2" id="0" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr2[1]} name="setHayTr2" alt="hayTr2" id="1" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr2[2]} name="setHayTr2" alt="hayTr2" id="2" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr2[3]} name="setHayTr2" alt="hayTr2" id="3" onChange={(event) => changeHandler(event)}></input></Td>
                    </Tr>
                    <Tr className="tr">
                        <Td><input value={appContext.hayTr3[0]} name="setHayTr3" alt="hayTr3" id="0" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr3[1]} name="setHayTr3" alt="hayTr3" id="1" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr3[2]} name="setHayTr3" alt="hayTr3" id="2" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr3[3]} name="setHayTr3" alt="hayTr3" id="3" onChange={(event) => changeHandler(event)}></input></Td>
                    </Tr>
                    <Tr className="tr">
                        <Td><input value={appContext.hayTr4[0]} name="setHayTr4" alt="hayTr4" id="0" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr4[1]} name="setHayTr4" alt="hayTr4" id="1" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr4[2]} name="setHayTr4" alt="hayTr4" id="2" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr4[3]} name="setHayTr4" alt="hayTr4" id="3" onChange={(event) => changeHandler(event)}></input></Td>
                    </Tr>
                    <Tr className="tr">
                        <Td><input value={appContext.hayTr5[0]} name="setHayTr5" alt="hayTr5" id="0" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr5[1]} name="setHayTr5" alt="hayTr5" id="1" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr5[2]} name="setHayTr5" alt="hayTr5" id="2" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr5[3]} name="setHayTr5" alt="hayTr5" id="3" onChange={(event) => changeHandler(event)}></input></Td>
                    </Tr>
                    <Tr className="tr">
                        <Td><input value={appContext.hayTr6[0]} name="setHayTr6" alt="hayTr6" id="0" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr6[1]} name="setHayTr6" alt="hayTr6" id="1" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr6[2]} name="setHayTr6" alt="hayTr6" id="2" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td><input value={appContext.hayTr6[3]} name="setHayTr6" alt="hayTr6" id="3" onChange={(event) => changeHandler(event)}></input></Td>
                    </Tr>
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
                    <Tr className="honey-tr">
                        <Td className="honey-type-td"><input value={appContext.honeyTr1[0]} name="setHoneyTr1" alt="honeyTr1" id="0" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={appContext.honeyTr1[1]} name="setHoneyTr1" alt="honeyTr1" id="1" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={appContext.honeyTr1[2]} name="setHoneyTr1" alt="honeyTr1" id="2" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={appContext.honeyTr1[3]} name="setHoneyTr1" alt="honeyTr1" id="3" onChange={(event) => changeHandler(event)}></input></Td>
                    </Tr>
                    <Tr className="honey-tr">
                        <Td className="honey-type-td"><input value={appContext.honeyTr2[0]} name="setHoneyTr2" alt="honeyTr2" id="0" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={appContext.honeyTr2[1]} name="setHoneyTr2" alt="honeyTr2" id="1" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={appContext.honeyTr2[2]} name="setHoneyTr2" alt="honeyTr2" id="2" onChange={(event) => changeHandler(event)}></input></Td>
                        <Td className="honey-td"><input value={appContext.honeyTr2[3]} name="setHoneyTr2" alt="honeyTr2" id="3" onChange={(event) => changeHandler(event)}></input></Td>
                    </Tr>
                </Tbody>
            </Table>
        </body>
    )
}

export default AdminApp;