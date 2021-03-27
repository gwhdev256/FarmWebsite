import React from 'react';
import '../App.css';

import honey from '../images/HoneyPic1.jpg';

const Home = () => {
    return (
        <div>
            <div className="home-slogan">
                Providing Albertans with Quality Hay and Honey
            </div>
            <div className="home-honey-info">
                <img src={honey} className="honey-pic-1"/>
                <div className="honey-pic-1-description">This is the best honey.</div>
            </div>
        </div>
    )
}

export default Home;