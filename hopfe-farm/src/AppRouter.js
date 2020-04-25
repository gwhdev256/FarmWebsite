import React, { useState } from 'react';
import './App.css';
import Home from './components/Home.js';
import Hay from './components/Hay.js';
import Honey from './components/Honey.js';
import Contact from './components/Contact.js';
import Admin from './components/Admin.js';
import { AppContext } from './components/AppContext.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import home from './images/home.svg';
import hay from './images/hay.svg';
import honey from './images/honey.svg';
import contact from './images/contact.svg';

const AppRouter = () => {
    const appContext = React.useContext(AppContext);

    const pageDisplayed = () => {
        if (appContext.selectedIcon === home) {
            return < Home />;
        } if (appContext.selectedIcon === hay) {
            return < Hay />;
        } if (appContext.selectedIcon === honey) {
            return < Honey />;
        } if (appContext.selectedIcon === contact) {
            return < Contact />;
        } else return
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className="Farm-name">
                    Hopfe Farm
            </div>
                <div className="Nav-bar">
                    <div className="Home-nav">
                        {<img key={1} name={home} alt="homepage" src={home} tabIndex={0} className={(appContext.selectedIcon === home) ? `Selected home` : `Unselected home`} onClick={(event) => appContext.selectedElement(event)} />}
                        <span className="Tooltip home-tip">Home Page</span>
                    </div>
                    <div className="Hay-nav">
                        <img key={2} name={hay} alt="haypage" src={hay} tabIndex={0} className={(appContext.selectedIcon === hay) ? `Selected hay` : `Unselected hay`} onClick={(event) => appContext.selectedElement(event)} />
                        <span className="Tooltip hay-tip">Hay</span>
                    </div>
                    <div className="Honey-nav">
                        <img key={3} name={honey} alt="honeypage" src={honey} tabIndex={0} className={(appContext.selectedIcon === honey) ? `Selected honey` : `Unselected honey`} onClick={(event) => appContext.selectedElement(event)} />
                        <span className="Tooltip honey-tip">Honey</span>
                    </div>
                    <div className="Contact-nav">
                        <img key={4} name={contact} alt="contactpage" src={contact} tabIndex={0} className={(appContext.selectedIcon === contact) ? `Selected contact` : `Unselected contact`} onClick={(event) => appContext.selectedElement(event)} />
                        <span className="Tooltip contact-tip">Contact Us</span>
                    </div>
                </div>
            </header>
            {pageDisplayed()}
        </div>
    )
};

export default AppRouter;