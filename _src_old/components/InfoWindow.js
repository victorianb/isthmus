import React from 'react';
import PropTypes from 'prop-types';

const InfoWindow = ({ nombre_del_centro, descripcion_tipo_proveedor, pobmuni }) => (
  <as-infowindow>
    <h3 className="as-subheader">{nombre_del_centro}</h3>
    <h4 className="as-body">Tipo: {descripcion_tipo_proveedor}</h4>
    <p className="as-body">Población: {pobmuni}</p>
</as-infowindow>
);

export default InfoWindow;
