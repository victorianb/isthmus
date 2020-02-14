export default {
  name: 'allinfomuni_v4',

  visible: true,

  cartocss: `
    #layer {
      polygon-fill: ramp([nivel_actual], (#d5d7d9, #deebf7, #9ecae1, #c6dbef, #08519c, #2171b5, #08306b, #6baed6, #4292c6, #011636), ("0", "1-", "2-", "1+", "3", "3-", "4", "2", "2+", "4-"), "=");
      polygon-opacity: 0.66;
    }
    #layer::outline {
      line-width: 1;
      line-color: #e0e0e0;
      line-opacity: 0.5;
    }
  `,

  query: `
    SELECT * FROM allinfomuni_v4

  `,

  options: {
    featureClickColumns: ['nivel_optimo','propsaludmuni','asegsaludindmuni','muni','pobmuni', 'numservicios', 'nivel_actual', 'asegsaludmuni','ccaa','prov']
  }
};

