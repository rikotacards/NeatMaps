import React from 'react';
import axios from 'axios';
import RecentlySaved from './RecentlySaved.jsx';
import ProcessedData from '../../../ProcessedDataCSV1';

//location data is taken processed data in ProcessedDataCSV1.js to prevent recurring API requests (which will increase in cost)

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
      // ProcessedData.dataFromCSV1,
      mapConfirmed:false,
      loading:false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    var form = e.target;
    var data = new FormData(form)
    data.append('file',this.props.filePath)

    this.setState({
      loading:true
    })

    axios({
      url:'/mapdata',
      method:'post',
      data:data
    })
    .then((res)=> {
      this.setState({
        data: [...this.state.data, ...[res.data]],
        mapConfirmed:true,
        loading:false
      })
    })
    .then(()=>{
      if(this.state.data.length>3){
        var newstate = this.state.data;
        newstate.shift()
        this.setState({
          data: newstate
        })
      }
    })
    .catch((error) =>{
      console.log(error)
    })
  }


  render(){



    var pStyle = {color:'lightgray'}
    if(this.props.uploadStatus){
      pStyle = {color:'black'}
    }

    console.log(this.props.uploadStatus)
    return(
      <span>
        <p style={pStyle}>Assign column mapping</p>
        <form  name = 'mapForm' onSubmit = {this.handleSubmit}>
        <div className ='headermap'>
          {this.state.options.map((i,index) =>
            <div style = {pStyle} className ={'label column' + (index+1) } key = {index}>
              column {index +1}
              <div className = {' select selector'+(index+1)}>
                <select  disabled = {!this.props.uploadStatus}name = {index}>
                    {this.state.options.map((i,index)=>
                      <option key = {index} value = {i}>{i}</option>)}
                </select>
              </div>
            </div>)}
            </div>

            <div>{this.state.loading ? 'loading...' : null }</div>

            <button className = 'confirmMapping' disabled ={!this.props.uploadStatus === !this.state.mapConfirmed} type = 'submit'>{this.state.mapConfirmed ? 'done' : 'Confirm mapping'}</button>


        </form>
        {this.state.mapConfirmed?(<button onClick = {()=>{document.getElementById('uploadCSV').reset()}}value = 'another'>Add another file</button>):(null)}


        <p> Display data on map</p>

        <RecentlySaved
          fileName = {this.props.fileName}
          mapConfirmed = {this.state.mapConfirmed}
          locationData = {this.state.data}
        />



      </span>
    )
  }
}

export default MapCSVForm