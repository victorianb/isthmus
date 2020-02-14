export default {
  name: 'Unica360 Salud',

  visible: false,

  cartocss: `
  #layer {
    polygon-fill: ramp([c02_06_gasto_m_salud_m], (#f9ddda,#f2b9c4,#e597b9,#ce78b3,#ad5fad,#834ba0,#573b88), quantiles);
    polygon-opacity: 1;
  }
  #layer::outline {
      line-width: 0.3;
      line-color: #FFFFFF;
      line-opacity: 0.5;
  }
  `,

  query: `
      SELECT 
      d.cartodb_id, 
      g.the_geom,
      g.the_geom_webmercator,
      d.c02_06_gasto_m_salud_m
      
      FROM  
      unica360_demographics_demographics_esp_grid100x100m_2018_annual as d
      JOIN unica360_geography_esp_grid100x100m_2018 as g
      
      ON g.geoid = d.geoid
      
      WHERE c02_06_gasto_m_salud_m > 0 
      
  `,

  options: {
    featureClickColumns: []
  }
};

