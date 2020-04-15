import React, { useState } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Hay = () => {
    return (
        <body className="hay-app">
            <h1 className="hay-app-header">Hay For Sale</h1>
            <h2 className="hay-description">All Hay is a Mix of Alfalfa, Brohm, Timothy and Orchard Grass available in 1400 lb Round Bales</h2>
            <span className="hay-contact">Please contact Garth Hopfe for hay orders.</span>
            <span className="hay-disclaimer">Hay prices are subject to change and do not include delivery fees.</span>
            <Table>
                <Thead>
                    <Tr>
                        <Th className="hay-table-header">Hay Type</Th>
                        <Th className="hay-table-header">Bale Quality</Th>
                        <Th className="hay-table-header">Quantity</Th>
                        <Th className="hay-table-header">Price/Bale</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr className="tr">
                        <Td>5% Alfalfa</Td>
                        <Td>No Rain</Td>
                        <Td>10</Td>
                        <Td>$ 125.00</Td>
                    </Tr>
                    <Tr className="tr">
                        <Td>30% Alfalfa</Td>
                        <Td>No Rain</Td>
                        <Td>50</Td>
                        <Td>$ 120.00</Td>
                    </Tr>
                    <Tr className="tr">
                        <Td>5% Alfalfa</Td>
                        <Td>Some Rain</Td>
                        <Td>15</Td>
                        <Td>$ 100.00</Td>
                    </Tr>
                </Tbody>
            </Table>
        </body>
    )
}

export default Hay;