import React from 'react';
import axios from 'axios';
import RecentlySaved from './RecentlySaved.jsx';

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
      console.log('from end MAP button', res.data)

      this.setState({
        data: [...this.state.data, ...[res.data]]
      },()=>console.log(this.state.data))
    })
  }

  render(){
    return(
      <span>
        <p>Assign column mapping</p>
        <form  name = 'mapForm' onSubmit = {this.handleSubmit}>
        <div className ='headermap'>
          {this.state.options.map((i,index) =>
            <div className ={'label column' + (index+1) } key = {index}>
              column {index +1}
              <div className = {' select selector'+(index+1)}>
                <select  name = {index}>
                    {this.state.options.map((i,index)=>
                      <option key = {index} value = {i}>{i}</option>)}
                </select>
              </div>
            </div>)}
            </div>
            <button type = 'submit'>Confirm mapping</button>

        </form>
        <p> Display data on map</p>
        <RecentlySaved/>
      </span>
    )
  }
}

export default MapCSVForm