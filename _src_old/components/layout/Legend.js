import React, { useState } from 'react';
import { connect } from 'react-redux';
import '@carto/airship-style';
import { log } from '@carto/carto-vl';
import { element } from 'prop-types';

const Legend = ({ horizontal, vertical, background, layers }) => {
  const position = `as-panel as-panel--${horizontal} as-panel--${vertical}`;

  const backgroundFinal = `as-panel__element as-p--32 ${background}`

  return (
    <div id="legend1" className="as-map-panels" data-name={name}>
      <div className={position}>
        <div className={backgroundFinal}>
          <div className="legend-block">
            <div className="legend-title">Centros</div>
            <ul className="legend">
            <li className="legend-item">
                <span className="legend-circle" style={{opacity:1, background: '#000', borderRadius: '50%'}}></span>
              <p className="legend-text">Centros</p>
            </li>
            </ul>
          </div>
          <div className="legend-block">
            <div className="legend-title">Municipios por Nivel Act</div>
            <ul className="legend">
            <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#d5d7d9'}}></span>
                <p className="legend-text" title="0">0</p>
              </li>
              <li className="legend-item">
                <span className="legend-circle" style={{opacity:1, background: '#DEEBF7'}}></span>
                <p className="legend-text" title="1-">1-</p>
              </li>
              <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#c6dbef'}}></span>
                <p className="legend-text" title="1+">1+</p>
              </li>
              <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#9ecae1'}}></span>
                <p className="legend-text" title="2-">2-</p>
              </li>
              <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#6baed6'}}></span>
                <p className="legend-text" title="2">2</p>
              </li>
              <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#4292c6'}}></span>
                <p className="legend-text" title="2+">2+</p>
              </li>
              <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#2171b5'}}></span>
                <p className="legend-text" title="3-">3-</p>
              </li>
              <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#08519c'}}></span>
                <p className="legend-text" title="3">3</p>
              </li>
              <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#011636'}}></span>
                <p className="legend-text" title="4-">4-</p>
              </li>
              <li className="legend-item">
                  <span className="legend-circle" style={{opacity:1, background: '#08306b'}}></span>
                <p className="legend-text" title="4">4</p>
              </li>


            </ul>
          </div>
          <div className="legend-block">
            <div className="legend-title">Gastos en salud</div>
            <ul className="legend">
            <li className="legend-item">
              <span className="legend-circle" style={{opacity:1, background: '#F9DDDA'}}></span>
              <p className="legend-text">Bajo</p>
            </li>
            <li className="legend-item">
              <span className="legend-circle" style={{opacity:1, background: '#F2B9C4'}}></span>
            </li>
            <li className="legend-item">
              <span className="legend-circle" style={{opacity:1, background: '#E597B9'}}></span>
            </li>
            <li className="legend-item">
              <span className="legend-circle" style={{opacity:1, background: '#CE78B3'}}></span>
            </li>
            <li className="legend-item">
              <span className="legend-circle" style={{opacity:1, background: '#AD5FAD'}}></span>
            </li>
            <li className="legend-item">
              <span className="legend-circle" style={{opacity:1, background: '#834BA0'}}></span>
            </li>
            <li className="legend-item">
              <span className="legend-circle" style={{opacity:1, background: '#573B88'}}></span>
              <p className="legend-text">Alto</p>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

export default connect(mapStateToProps)(Legend);
