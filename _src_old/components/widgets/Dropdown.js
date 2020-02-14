import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import '@carto/airship-style';
import carto from '@carto/carto.js';
import C from '../../data/C';
import axios from 'axios';



const { SQL_API_URL, API_KEY, USERNAME } = C;

const SQL_CLIENT = axios.create({
  method: 'get',
  url: SQL_API_URL,
  params: {
      api_key: API_KEY
  }
});


const Dropdown = ({ categoryLayer, column, operation, operationColumn, client, placeholder,map, hasSearcher, specialties }) => {
  const categoriesLayer = !Array.isArray(categoryLayer) ? [categoryLayer]: categoryLayer
  const columns = !Array.isArray(column) ? [column]: column

  const widget = useRef(null)
  let searcher
  let input
  const [cats, setCategories] = useState([])
  const [selected, setSelected] = useState(null)
  const [cartoFilter, setCartoFilter] = useState({})

  if (hasSearcher) {
    searcher = document.createElement('div')
    input = document.createElement('input')
    input.classList = 'as-input'
    input.type = 'text'
    input.onkeyup = e => {
      const value = e.target.value
      widget.current.options = cats
      if (value) {
        const regex = new RegExp(value, 'gi')
        const fi = cats.filter(x => x.value.match(regex))
        widget.current.options = fi
      }
    }
    searcher.appendChild(input)
  }

  useEffect(() => {

    widget.current.options = cats;

    widget.current.defaultText = placeholder
    widget.current.showClearButton = true;
    setSelected(widget.current.selectedOption)

    widget.current.addEventListener('optionChanged', (e) => {
      setSelected(e.detail)
      resetSearcher()
    })

    widget.current.onClickOutside = () => {}
    const ul = widget.current.querySelector('.as-dropdown__list')
    if (ul && hasSearcher) {
      ul.insertBefore(searcher, ul.firstChild)
    }
  }, [cats])

  


  useEffect(() => {

    const dataView = new carto.dataview.Category(categoriesLayer[0].source, column[0], {
      limit: 8000,
      operation: operation,
      operationColumn: operationColumn
    });

    dataView.on('dataChanged', ({ categories }) => {
      const cat = new Set()
      categories.forEach((value) => {
        if (Array.isArray(value.name)) {
          value.name.forEach(x => {
            // const val = { "text": x, "value": x }
            cat.add(x.trim())  
          })
        } else {
          // const val = { "text": value.name, "value": value.name }
          cat.add(value.name.trim())
        }
      })
      
      setCategories([...cat].map(x => {
        return { text: x, value: x}
      }))
    });

    client.addDataview(dataView);
    console.log(cats)
  }, [])

  const resetSearcher = () => {
    if (input) {
      input.value = ''
      widget.current.options = cats;
    }
  }

  const addFilter = () => {
    if (!specialties) {
      const filters = cartoFilter
      categoriesLayer.forEach((layer, i) => {
        const filter = new carto.filter.Category(columns[i], { [!specialties ? 'eq' : 'in']: selected });
        layer.source.addFilter(filter);
        filters[layer.name] = filter
      })

      

      setCartoFilter(filters)
      let query = `SELECT ST_X(ST_Centroid(the_geom)) as x, ST_Y(ST_Centroid(the_geom)) as y FROM ${categoriesLayer[0].name} WHERE  ${columns[0]} = '${selected}' LIMIT 1`

        let x = 0
        let y = 0
        SQL_CLIENT.request({
          params: {
              q: query
          }
        })
        .then((result) => {
            console.log(result)
            if (result.data.rows.length > 0) {
              x = result.data.rows[0].x
              y = result.data.rows[0].y   
            }
            map.flyTo([y,x], 9);
      
        })
        .catch((error) => {
            console.log(error)
        });
        
      } else {
        localStorage.setItem('especialidad', selected)
        console.log(categoriesLayer[0])
        let q = `SELECT  * FROM ${categoriesLayer[0].name} WHERE '${selected}' = ANY (${columns[0]})`
        console.log(q)
        categoriesLayer[0].source.setQuery(q)

        // console.log(categoriesLayer[1])
        // let q1 = `SELECT  * FROM ${categoriesLayer[1].name} WHERE '${selected}' = ANY (${columns[1]})`
        // console.log(q1)
        // categoriesLayer[1].source.setQuery(q1)

      }

  }

  const removeFilter = () => {
    if (!specialties) {
      categoriesLayer.forEach(layer => {
        layer.source.removeFilter(cartoFilter[layer.name]);
      })
      setCartoFilter({})
    } else {
      localStorage.setItem('especialidad', '') 
      let q = `SELECT * FROM ${categoriesLayer[0].name}`
      console.log(q)
      categoriesLayer[0].source.setQuery(q)
    
      // let q1 = `SELECT * FROM ${categoriesLayer[1].name}`
      // console.log(q1)
      // categoriesLayer[1].source.setQuery(q1)

    }
  }


  useEffect(() => {
    resetSearcher()
    removeFilter()
    // if (specialties) {
    //   categoriesLayer[0].layer.query = 'SELECT * FROM proveedores_toplot_geocoded'
    // }
    if (selected) {
      // if (specialties) {
      //   categoriesLayer[0].layer.query = 'SELECT * FROM proveedores_toplot_geocoded_201912'
      // }
      addFilter()
    }

  }, [selected])

  return (
    <div className="as-p--16">
      <as-dropdown
        ref={widget}
      >
      </as-dropdown>
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

export default connect(mapStateToProps)(Dropdown);
