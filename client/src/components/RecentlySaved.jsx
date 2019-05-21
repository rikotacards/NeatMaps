import React from 'react';
import GoogleMaps from './GoogleMaps.jsx'

class RecentlySaved extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataToMap:null,
      fileID: null
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState){

    if(this.props.locationData !== prevProps.locationData){

      var renderID = this.props.locationData.length-1
      this.setState({
        dataToMap: this.props.locationData[renderID]
      })
    }
  }

  handleClick(e){
    e.preventDefault();

    this.setState({
      dataToMap:this.props.locationData[e.target.id],
      fileID: e.target.id
    })

  }

  render(){
    return(
      <div>
        {this.props.locationData.map((i,index)=>
        <span className='displayButton' key={index}>
          <button className='marker-controller-btn' onClick={this.handleClick} id={index}>
            {this.props.fileName[index]}
          </button>
        </span>
        )}
        <button className='addData' onClick={()=>
          {document.getElementById('uploadform').style.display = 'block'
          document.getElementById('uploadCSV').reset()
          document.getElementById('col-map-form').reset()
          }
          }>
          +
        </button>
        <div>
          <GoogleMaps locationData={this.state.dataToMap} fileID={this.state.fileID} />
        </div>
      </div>
    )
  }
}

export default RecentlySaved