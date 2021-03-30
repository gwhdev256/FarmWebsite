import React from 'react';
import '../App.css';

import honey from '../images/HoneyPic1.jpg';
import bale from '../images/HayBale1.jpg';
import trailer2 from '../images/TrailerLoad2.jpg';

const Home = () => {
    return (
        <div>
            <div className="home-slogan">
                Providing Albertans with Quality Hay and Honey
            </div>
            <div className="home-hay-info">
                <img src={bale} className="hay-pic-1"/>
                <div className="hay-pic-1-description">All Hay is a Mix of Alfalfa, Brohm, Timothy and Orchard Grass available in 1400 lb Round Bales</div>
            </div>
            <div className="home-trailer-info">
                <div className="trailer-pic-2-description">Delivery and/or skidsteer services are also available.</div>
                <img src={trailer2} className="trailer-pic-2"/>
            </div>
            <div className="home-honey-info">
                <img src={honey} className="honey-pic-1"/>
                <div className="honey-pic-1-description">This is the best honey.</div>
            </div>
        </div>
    )
}

export default Home;