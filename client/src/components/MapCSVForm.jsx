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
      mapConfirmed:false,
      loading:false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetMapConfirmed = this.resetMapConfirmed.bind(this)
  }

  resetMapConfirmed(){
    this.setState({
      mapConfirmed:false
    })
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
      },()=>{console.log('from Mapcsv form ', this.state.data)})
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
    .then(()=>{
      document.getElementById('uploadform').style.display='none'

      document.getElementById('mapFormContainer').style.display = 'none'
    })
    .then(()=>{
      this.props.resetState();
      this.resetMapConfirmed()
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

    var displayOriginal = []
    if(this.props.originalData){
    for(var i =0; i<4; i++){
      displayOriginal.push(this.props.originalData[i])
    }
  }

    return(
      <span>
        <div id='mapFormContainer' style={{'display':'none'}}>
          <p style={pStyle}>Assign column mapping </p>
          < p className='preview-disclaimer'>*Below is a preview of your original data</p>
            <form id='col-map-form' name='mapForm' onSubmit={this.handleSubmit}>
              <div className='headermap'>
                {this.state.options.map((i,index) =>
                <div style={pStyle} className={'label column' + (index+1) } key={index}>
                  column {index +1}
                  <div className={' select selector'+(index+1)}>
                    <select disabled={!this.props.uploadStatus}name={index}>
                      {this.state.options.map((i,index)=>
                      <option key={index} value={i}>{i}</option>)}
                    </select>

                  </div>
                </div>)}
              </div>
              <div className='table-wrapper'>
                <table className='preview-table'>
                  <tbody>
                    {displayOriginal.map((rows,index)=>
                    <tr key={index}>
                      <td>{rows.col1}</td>
                      <td>{rows.col2}</td>
                      <td>{rows.col3}</td>
                      <td>{rows.col4}</td>
                      <td>{rows.col5}</td>
                    </tr>)}
                  </tbody>
                </table>
              </div>

            <div className='column-mapping-load'>
              {this.state.loading ? 'loading...' : null }
            </div>

            <button className='confirmMapping' disabled={!this.props.uploadStatus===!this.state.mapConfirmed}
              type='submit'>{this.state.mapConfirmed ? 'done' : 'Confirm mapping'}</button>


        </form>
        </div>

        <p> Add data to map</p>

        <RecentlySaved
          fileName = {this.props.fileName}
          mapConfirmed = {this.state.mapConfirmed}
          locationData = {this.state.data}
          resetState = {this.props.resetState}
          resetMapConfirmed = {this.resetMapConfirmed}
        />



      </span>
    )
  }
}

export default MapCSVForm