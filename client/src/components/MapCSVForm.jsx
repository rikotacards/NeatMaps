import React from 'react';
import axios from 'axios';

class MapCSVForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      options: [
        'ADDRESS',
        'CITY',
        'STATE',
        'ZIPCODE',
        'CATEGORY'
      ]
    }
  }
  render(){
    return(
      <div>
        <form name = 'mapForm'>
          {this.state.options.map((i,index) =>
            <div key = {index}>
              column {index +1}
              <div>
                <select name = {index}>
                    {this.state.options.map((i,index)=>
                      <option key = {index} value = {i}>{i}</option>)}
                </select>
              </div>
            </div>)}
        </form>
      </div>
    )
  }
}

export default MapCSVForm