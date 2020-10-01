import React from 'react';
import './App.css';
import Home from './components/Home.js';
import Hay from './components/Hay.js';
import Honey from './components/Honey.js';
import Contact from './components/Contact.js';
import { AppContext } from './components/AppContext.js';
import AdminLogin from './components/AdminLogin.js';
import { Link, Route} from 'react-router-dom';

import home from './images/home.svg';
import hay from './images/hay.svg';
import honey from './images/honey.svg';
import contact from './images/contact.svg';

const AppRouter = () => {
    const appContext = React.useContext(AppContext);

    return (
        <div className="App">
            <header className="App-header">
                <div className="Farm-name">
                    Hopfe Farm
                </div>
                <div className="Nav-bar">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div className="Home-nav">
                            {<img key={1} name="home" alt="homepage" src={home} tabIndex={0} className={(appContext.selectedIcon === "home") ? `Selected home` : `Unselected home`} onClick={(event) => appContext.setSelectedIcon(event.target.name)} />}
                            <span className="Tooltip home-tip">Home Page</span>
                        </div>
                    </Link>
                    <Link to="/hay" style={{ textDecoration: 'none' }}>
                        <div className="Hay-nav">
                            <img key={2} name="hay" alt="haypage" src={hay} tabIndex={0} className={(appContext.selectedIcon === "hay") ? `Selected hay` : `Unselected hay`} onClick={(event) => appContext.setSelectedIcon(event.target.name)} />
                            <span className="Tooltip hay-tip">Hay</span>
                        </div>
                    </Link>
                    <Link to="/honey" style={{ textDecoration: 'none' }}>
                        <div className="Honey-nav">
                            <img key={3} name="honey" alt="honeypage" src={honey} tabIndex={0} className={(appContext.selectedIcon === "honey") ? `Selected honey` : `Unselected honey`} onClick={(event) => appContext.setSelectedIcon(event.target.name)} />
                            <span className="Tooltip honey-tip">Honey</span>
                        </div>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <div className="Contact-nav">
                            <img key={4} name="contact" alt="contactpage" src={contact} tabIndex={0} className={(appContext.selectedIcon === "contact") ? `Selected contact` : `Unselected contact`} onClick={(event) => appContext.setSelectedIcon(event.target.name)} />
                            <span className="Tooltip contact-tip">Contact Us</span>
                        </div>
                    </Link>
                </div>
            </header>
            <Route exact={true} path="/" component={Home} />
            <Route path="/hay" component={Hay} />
            <Route path="/honey" component={Honey} />
            <Route path="/contact" component={Contact} />
            <Route exact={true} path="/login" component={AdminLogin} />
        </div>
    )
};

export default AppRouter;