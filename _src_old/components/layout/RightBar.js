import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Category from '.././widgets/Category'
import Histogram from '.././widgets/Histogram'
import Formula from '.././widgets/Formula'
import Range from '.././widgets/Range'
import Table from '../widgets/Table'

import Export from '.././widgets/Export'
import '@carto/airship-style';
import C from '../../data/C'
import axios from 'axios';
import { throws } from 'assert';


const { SQL_API_URL, API_KEY, USERNAME } = C;

const SQL_CLIENT = axios.create({
  method: 'get',
  url: SQL_API_URL,
  params: {
      api_key: API_KEY
  }
});

class RightBar extends Component {
  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }
  state = {
    size:null,
    name:null
  }

  render() {

    return (
      <aside className={this.state.size} data-name={this.props.name}>
      <div className="as-m--24">
      <Range
        before=''
        after='°F'
        title='Temperature'
        description='Temperature at the time of the accident'
        layer={this.props.layers.proveedores.source}
        column='asegsaludindmuni'
        step={1}
      />
      </div>
      </aside>
    )

  }
  

}




const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});


export default connect(mapStateToProps)(RightBar);
