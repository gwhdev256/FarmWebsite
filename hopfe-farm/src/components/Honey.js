import React, { useState } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';

const Honey = () => {
    const appContext = React.useContext(AppContext);

    const honeyTrArr = [appContext.honeyTr1, appContext.honeyTr2];

    const createTr = honeyTrArr.map((tr) => {
        if (tr[2] > 0) {
            return (
                <Tr className="tr">
                    <Td className="honey-type-td">{tr[0]}</Td>
                    <Td className="honey-td">{tr[1]}</Td>
                    <Td className="honey-td">Available</Td>
                    <Td className="honey-td">{tr[3]}</Td>
                </Tr>
            )
        } return (
                <Tr className="tr">
                    <Td className="honey-type-td">{tr[0]}</Td>
                    <Td className="honey-td">{tr[1]}</Td>
                    <Td className="honey-td">Sold Out</Td>
                    <Td className="honey-td">{tr[3]}</Td>
                </Tr>
        )
    })

    return (
        <body className="honey-app">
            <h1 className="honey-app-header">Honey For Sale</h1>
            <span className="honey-contact">Please contact Garth Hopfe for honey orders.</span>
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
                    {createTr}
                </Tbody>
            </Table>
        </body>
    )
}

export default Honey;