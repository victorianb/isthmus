import React from 'react';
import { connect } from 'react-redux';
import HeaderToggle from './header/HeaderToggle'
import HeaderLink from './header/HeaderLink'
import Avatar from './Avatar'
import Button from '../widgets/Button';



const Header = () => {
  
 

  
  return(
    <header className="as-toolbar">
      <HeaderToggle />
    <div className="as-toolbar__group">
      <div className="as-toolbar__item">
        <Avatar
          size='l'
          alt='AXA'
          icon="https://axa-humanity.geographica.io/assets/logos/AXA_logo.svg"
        />
      </div>
      <nav className="as-toolbar__actions">
        <ul>
          <HeaderLink name='Planificación Asistencial' link='/' />
        </ul>
      </nav>
    </div>


    {/* <div className="as-toolbar__item as-body">
      <i className="as-icon as-icon-settings as-subheader as-m--0"></i>
    </div> */}
  </header>
  );
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

export default connect(mapStateToProps)(Header);
