import React, { useState } from 'react';
import './App.css';
import Home from './components/Home.js';
import Hay from './components/Hay.js';
import Honey from './components/Honey.js';
import Contact from './components/Contact.js';

import home from './images/home.svg';
import hay from './images/hay.svg';
import honey from './images/honey.svg';
import contact from './images/contact.svg';

const App = () => {
  const [selectedIcon, setSelectedIcon] = useState(home);

  const selectedElement = (event) => {
    setSelectedIcon(event.target.name);
  }

  const pageDisplayed = () => {
    if (selectedIcon === home) {
      return < Home />;
    } if (selectedIcon === hay) {
      return < Hay />;
    } if (selectedIcon === honey) {
      return < Honey />;
    } if (selectedIcon === contact) {
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
            {<img key={1} name={home} alt="homepage" src={home} tabIndex={0} className={(selectedIcon === home) ? `Selected home` : `Unselected home`} onClick={(event) => selectedElement(event)} />}
            <span className="Tooltip home-tip">Home Page</span>
          </div>
          <div className="Hay-nav">
            <img key={2} name={hay} alt="haypage" src={hay} tabIndex={0} className={(selectedIcon === hay) ? `Selected hay` : `Unselected hay`} onClick={(event) => selectedElement(event)} />
            <span className="Tooltip hay-tip">Hay</span>
          </div>
          <div className="Honey-nav">
            <img key={3} name={honey} alt="honeypage" src={honey} tabIndex={0} className={(selectedIcon === honey) ? `Selected honey` : `Unselected honey`} onClick={(event) => selectedElement(event)} />
            <span className="Tooltip honey-tip">Honey</span>
          </div>
          <div className="Contact-nav">
            <img key={4} name={contact} alt="contactpage" src={contact} tabIndex={0} className={(selectedIcon === contact) ? `Selected contact` : `Unselected contact`} onClick={(event) => selectedElement(event)} />
            <span className="Tooltip contact-tip">Contact Us</span>
          </div>
        </div>
      </header>
      <div className="Component-display">
        {pageDisplayed()}
      </div>
    </div>
  );
}

export default App;
