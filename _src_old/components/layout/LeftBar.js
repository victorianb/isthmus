import React from 'react';
import { connect } from 'react-redux';
import { operation } from '@carto/carto.js'
import Button from '.././widgets/Button'
import Category from '.././widgets/Category'
import LinkButton from '.././widgets/LinkButton'
import Badge from '.././widgets/Badge'
import IconBadge from '.././widgets/IconBadge'
import InputButton from '.././widgets/InputButton'
import Import from '.././widgets/Import'
import Dropdown from '.././widgets/Dropdown'
import Formula from '.././widgets/Formula'
import TextSearch from '.././widgets/TextSearch'
import Input from '.././layout/Input'
import carto from '@carto/carto.js'
import Histogram from '.././widgets/Histogram'
import Range from '.././widgets/Range'
import Export from '../widgets/Export'


import '@carto/airship-style';

const LeftBar = ({ map, layers, size, background, name }) => {

  const moveMap = () => {
    map.flyTo([39.8283459, -98.5794797], 4);
  }


const sizeFinal = `as-sidebar as-sidebar--${size} as-sidebar--left ${background}`;

return (
  <aside className={sizeFinal} data-name={name}>
  <div className="as-m--24">
  <Dropdown
    categoryLayer={[layers.proveedores, layers.municipios]}
    placeholder='Provincias'
    column={['prov', 'prov']}
    hasSearcher

  />
  <Dropdown
    categoryLayer={[layers.municipios, layers.proveedores]}
    placeholder='Municipios'
    column={['muni', 'muni']}
    hasSearcher
  />
  <Dropdown
    categoryLayer={[layers.proveedores,layers.municipios]}
    placeholder='Especialidades'
    column={['especialidades_centro_arr','especialidades_muni_arr']}
    hasSearcher
    specialties
  />
  </div>
  <div className="as-m--12">
  <Export
    query={`Select * from allinfomuni_v4`}
    layer={layers.municipios.source}
    format='csv'
    filename='Municipios'
    name='Exportar Información de Muncipios'
  />
  </div>
  <div className="as-m--12">
  <Export 
    query={layers.proveedores.query}
    layer={layers.proveedores.source}
    format='csv'
    filename='Proveedores'
    name='Exportar Información de Centros'
  />
  </div>
  <div className="as-m--12">
  <Export 
    query={`Select * FROM servicios_planificacion_201912`}
    layer={layers.proveedores.source}
    format='csv'
    filename='servicios_planificacion'
    name='Exportar Servicios Planificación'
  />
 
  </div>
  </aside>
)}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox,
});

export default connect(mapStateToProps)(LeftBar);
