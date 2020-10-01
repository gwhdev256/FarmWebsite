import React, { useEffect } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';

const Hay = () => {
    const appContext = React.useContext(AppContext);
    const hayTrArr = [appContext.hayTr1, appContext.hayTr2, appContext.hayTr3, appContext.hayTr4, appContext.hayTr5, appContext.hayTr6];

    useEffect(() => {
        appContext.setSelectedIcon("hay");
    });

    const createTr = hayTrArr.map((tr) => {
        if (tr[2] > 0) {
            return (
                <Tr key={`${tr[0]}_${tr[1]}`} className="tr">
                    <Td key={`${tr[0]}_${tr[1]}`+1}>{tr[0]}</Td>
                    <Td key={`${tr[0]}_${tr[1]}`+2}>{tr[1]}</Td>
                    <Td key={`${tr[0]}_${tr[1]}`+3}>Available</Td>
                    <Td key={`${tr[0]}_${tr[1]}`+4}>{tr[3]}</Td>
                </Tr>
            )
        } return (
                <Tr key={`${tr[0]}_${tr[1]}`} className="tr">
                    <Td key={`${tr[0]}_${tr[1]}`+1}>{tr[0]}</Td>
                    <Td key={`${tr[0]}_${tr[1]}`+2}>{tr[1]}</Td>
                    <Td key={`${tr[0]}_${tr[1]}`+3}>Sold Out</Td>
                    <Td key={`${tr[0]}_${tr[1]}`+4}>{tr[3]}</Td>
                </Tr>
        )
    })

    return (
        <div className="hay-app">
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
                    {createTr}
                </Tbody>
            </Table>
        </div>
    )
}

export default Hay;