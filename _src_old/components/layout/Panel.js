import React from 'react';
import { connect } from 'react-redux';
import LayerToggle from '../widgets/LayerToggle'
import StyleToggle from '../widgets/StyleToggle'
import '@carto/airship-style';

const Panel = ({ horizontal, vertical, background, layers }) => {
  const position = `as-panel as-panel--${horizontal} as-panel--${vertical}`;

  const cartocss1 = `
  #layer {
    polygon-fill: ramp([pobmuni], (#fcde9c, #f58670, #e34f6f, #d72d7c, #7c1d6f), quantiles);
    polygon-opacity: 1;
}
#layer::outline {
    line-width: 0.3;
    line-color: #FFFFFF;
    line-opacity: 0.5;
}
  
  `
const cartocss_propsaludmuni = `
  #layer {
    polygon-fill: ramp([propsaludmuni], (#fcde9c, #f58670, #e34f6f, #d72d7c, #7c1d6f), quantiles);
    polygon-opacity: 1;
}
#layer::outline {
    line-width: 0.3;
    line-color: #FFFFFF;
    line-opacity: 0.5;
}
  
  `

  const backgroundFinal = `as-panel__element as-p--32 ${background}`

  return (
    <div className="as-map-panels" data-name={name}>
      <div className={position}>
        <div className={backgroundFinal}>
          <LayerToggle
            layer={layers.proveedores}
            title="Centros"
          />
          <LayerToggle
            layer={layers.municipios}
            title="Municipios"
          />
          {/* <LayerToggle
            layer={layers.proveedorIsolines}
            title="Isolineas (15 min en coche)"
          /> */}
         <LayerToggle
            layer={layers.unica360}
            title="Gasto en Salud"
          />
         {/* <StyleToggle
            layer={layers.municipios}
            name='Pintar por Población'
            cartocss={cartocss1}
          /> */}
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

export default connect(mapStateToProps)(Panel);
