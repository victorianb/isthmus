export default {
  name: 'Proovedores Isolines',

  visible: false,

  cartocss: `
  #layer {
    polygon-fill:  blue;
    polygon-opacity: 0.001;
  }
  #layer::outline {
    line-width: 0.1;
    line-color: blue;
    line-opacity: 0.15;
  }
  `,

  query: `
    SELECT * FROM proveedores_isolines

  `,

  options: {
    featureClickColumns: []
  }
};

