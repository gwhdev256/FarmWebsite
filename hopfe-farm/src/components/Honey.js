import React, { useEffect } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';


const Honey = () => {
    const appContext = React.useContext(AppContext);

    useEffect(() => {
        appContext.setSelectedIcon("honey");
    });

    const createTr = appContext.honeyTr.map((tr) => {
        let availability = "Sold Out";
        if (tr[2] > 0) {
            availability = "Available";
        }
        return (
            <Tr key={`${tr[0]}_${tr[1]}`} className="tr">
                <Td key={`${tr[0]}_${tr[1]}`+1} className="honey-type-td">{tr[0]}</Td>
                <Td key={`${tr[0]}_${tr[1]}`+2} className="honey-td">{tr[1]}</Td>
                <Td key={`${tr[0]}_${tr[1]}`+3} className="honey-td">{availability}</Td>
                <Td key={`${tr[0]}_${tr[1]}`+4} className="honey-td">{tr[3]}</Td>
            </Tr>
        )
    })

    return (
        <div className="honey-app">
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
        </div>
    )
}

export default Honey;