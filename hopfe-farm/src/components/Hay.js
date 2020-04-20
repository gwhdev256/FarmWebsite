import React, { useState } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';

const Hay = () => {
    const appContext = React.useContext(AppContext);
    return (
        <body className="hay-app">
            <h1 className="hay-app-header">Hay For Sale</h1>
            <h2 className="hay-description">All Hay is a Mix of Alfalfa, Brohm, Timothy and Orchard Grass available in 1400 lb Round Bales</h2>
            <span className="hay-contact">Please contact Garth Hopfe for hay orders.</span>
            <span className="hay-disclaimer">Hay prices are subject to change and do not include delivery fees.</span>
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
                        <Td>{appContext.hayTr1[0]}</Td>
                        <Td>{appContext.hayTr1[1]}</Td>
                        <Td>{appContext.hayTr1[2]}</Td>
                        <Td>{appContext.hayTr1[3]}</Td>
                    </Tr>
                    <Tr className="tr">
                        <Td>{appContext.hayTr2[0]}</Td>
                        <Td>{appContext.hayTr2[1]}</Td>
                        <Td>{appContext.hayTr2[2]}</Td>
                        <Td>{appContext.hayTr2[3]}</Td>
                    </Tr>
                    <Tr className="tr">
                        <Td>{appContext.hayTr3[0]}</Td>
                        <Td>{appContext.hayTr3[1]}</Td>
                        <Td>{appContext.hayTr3[2]}</Td>
                        <Td>{appContext.hayTr3[3]}</Td>
                    </Tr>
                    <Tr className="tr">
                        <Td>{appContext.hayTr4[0]}</Td>
                        <Td>{appContext.hayTr4[1]}</Td>
                        <Td>{appContext.hayTr4[2]}</Td>
                        <Td>{appContext.hayTr4[3]}</Td>
                    </Tr>
                    <Tr className="tr">
                        <Td>{appContext.hayTr5[0]}</Td>
                        <Td>{appContext.hayTr5[1]}</Td>
                        <Td>{appContext.hayTr5[2]}</Td>
                        <Td>{appContext.hayTr5[3]}</Td>
                    </Tr>
                    <Tr className="tr">
                        <Td>{appContext.hayTr6[0]}</Td>
                        <Td>{appContext.hayTr6[1]}</Td>
                        <Td>{appContext.hayTr6[2]}</Td>
                        <Td>{appContext.hayTr6[3]}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </body>
    )
}

export default Hay;