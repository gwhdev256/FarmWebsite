import React, { useEffect, useState } from 'react';
import '../App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AppContext } from './AppContext.js';
import { Ellipsis } from 'react-spinners-css';

const Hay = () => {
    const appContext = React.useContext(AppContext);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const initialLoad = async () => {
            await appContext.setSelectedIcon("hay");
            await appContext.hayTrLoader();
            setLoaded(true);
        }
        initialLoad();
        // eslint-disable-next-line
    }, []);

    const createTr = appContext.hayTr.map((tr) => {
        let availability;
        if (tr.Quantity > 0) {
            availability = "Available";
        } else {
            availability = "Sold Out";
        }
        
        return (
                <Tr key={`${tr.HayType}_${tr.BaleQuality}`} className="tr">
                    <Td key={`${tr.HayType}_${tr.BaleQuality}`+1}>{tr.HayType}</Td>
                    <Td key={`${tr.HayType}_${tr.BaleQuality}`+2}>{tr.BaleQuality}</Td>
                    <Td key={`${tr.HayType}_${tr.BaleQuality}`+3}>{availability}</Td>
                    <Td key={`${tr.HayType}_${tr.BaleQuality}`+4}>{"$ "+(tr.Price).toFixed(2)}</Td>
                </Tr>
        )
    });

    return (
        <div className="hay-app">
            <h1 className="hay-app-header">Hay For Sale</h1>
            <h2 className="hay-description">All Hay is a Mix of Alfalfa, Brohm, Timothy and Orchard Grass available in 1400 lb Round Bales</h2>
            <span className="hay-contact">Please contact Garth Hopfe for hay orders.</span>
            <span className="hay-disclaimer">Hay prices are subject to change and do not include delivery fees.</span>
            { loaded 
                ?   <Table>
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
                : <div className="spinner"><Ellipsis color="whitesmoke"/></div>
            }
        </div>
    )
}

export default Hay;