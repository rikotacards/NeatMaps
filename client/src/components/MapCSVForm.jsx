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
      ],
      headerData:null,
      data:[],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    var form = e.target;
    var data = new FormData(form)
    data.append('file',this.props.filePath)

    axios({
      url:'/mapdata',
      method:'post',
      data:data
    })
    .then((res)=> {
      console.log(res.data)

      this.setState({
        data: [...this.state.data, ...[res.data]]
      },()=>console.log(this.state.data))
    })
  }

  render(){
    return(
      <div>
        <p>Assign column mapping</p>
        <form name = 'mapForm' onSubmit = {this.handleSubmit}>
          {this.state.options.map((i,index) =>
            <span key = {index}>
              column {index +1}
              <div>
                <select name = {index}>
                    {this.state.options.map((i,index)=>
                      <option key = {index} value = {i}>{i}</option>)}
                </select>
              </div>
            </span>)}
            <button type = 'submit'>Confirm mapping</button>
        </form>
      </div>
    )
  }
}

export default MapCSVForm