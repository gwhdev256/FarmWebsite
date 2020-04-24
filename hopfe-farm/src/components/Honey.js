import React, { useState } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';

const Honey = () => {
    const appContext = React.useContext(AppContext);
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
                    <Tr className="honey-tr">
                        <Td className="honey-type-td">{appContext.honeyTr1[0]}</Td>
                        <Td className="honey-td">{appContext.honeyTr1[1]}</Td>
                        <Td className="honey-td">{appContext.honeyTr1[2]}</Td>
                        <Td className="honey-td">{appContext.honeyTr1[3]}</Td>
                    </Tr>
                    <Tr className="honey-tr">
                        <Td className="honey-type-td">{appContext.honeyTr2[0]}</Td>
                        <Td className="honey-td">{appContext.honeyTr2[1]}</Td>
                        <Td className="honey-td">{appContext.honeyTr2[2]}</Td>
                        <Td className="honey-td">{appContext.honeyTr2[3]}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </body>
    )
}

export default Honey;