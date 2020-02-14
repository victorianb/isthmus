export default {
  name: 'proveedores_toplot_geocoded_201912',

  visible: false,

  cartocss: `
  #layer {
    marker-width: 10;
    marker-fill: black;
    marker-fill-opacity: 0.5;
    marker-allow-overlap: true;
    marker-line-width: 1;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 1;
  }
  `,

  query: `
    SELECT * FROM proveedores_toplot_geocoded_201912

  `,

  options: {
    featureClickColumns: ['nombre_del_centro','cartodb_id', 'descripcion_tipo_proveedor', 'cp', 'pobmuni','especialidades_centro_arr']
  }
};
