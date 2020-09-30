import React, { useEffect } from 'react';
import '../App.css';
import { AppContext } from './AppContext.js';
import AdminApp from './AdminApp.js';
import AdminLogin from './AdminLogin.js';
import Home from './Home.js';
import Hay from './Hay.js';
import Honey from './Honey.js';
import Contact from './Contact.js';

import home from '../images/home.svg';
import hay from '../images/hay.svg';
import honey from '../images/honey.svg';
import contact from '../images/contact.svg';
import admin from '../images/padlock.svg';

const Admin = () => {
    const appContext = React.useContext(AppContext);

    useEffect(() => appContext.setIcon("login"), []);

    const adminPageDisplayed = () => {
        if (appContext.selectedIcon === home) {
            return < Home />;
        } if (appContext.selectedIcon === hay) {
            return < Hay />;
        } if (appContext.selectedIcon === honey) {
            return < Honey />;
        } if (appContext.selectedIcon === contact) {
            return < Contact />;
        } if (appContext.selectedIcon === admin) {
            return < AdminApp />;
        } if (appContext.selectedIcon === "login") {
            return < AdminLogin />;
        } else return < AdminLogin />;
    }

    const NavDefault = () => (
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
    );

    const NavAdmin = () => (
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
            <div className="Admin-nav">
                <img key={4} name={admin} alt="contactpage" src={admin} tabIndex={0} className={(appContext.selectedIcon === contact) ? `Selected contact` : `Unselected contact`} onClick={(event) => appContext.selectedElement(event)} />
                <span className="Tooltip admin-tip">Administrator</span>
            </div>
        </div>
    );

    const navSelector = () => {
        if (appContext.loggedIn === false) {
            return <NavDefault />;
        } return <NavAdmin />;
    }



    return (
        <div className="App">
            <header className="App-header">
                <div className="Farm-name">
                    Hopfe Farm
                </div>
                <div>
                    {navSelector()}
                </div>
            </header>
            {adminPageDisplayed()}
        </div >
    )
};

export default Admin;