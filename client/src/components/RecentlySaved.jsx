import React from 'react';
import GoogleMaps from './GoogleMaps.jsx'

class RecentlySaved extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataToMap: null,
      fileID: null
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault();

    this.setState({
      dataToMap:this.props.locationData[e.target.id],
      fileID: e.target.id
    },()=>console.log(this.state.fileID))

  }

  render(){
    return(
      <div>
        {this.props.locationData.map((i,index)=>
             <span className = 'displayButton' key = {index}>
             <button
              onClick = {this.handleClick}
              id = {index} disabled = {!this.props.mapConfirmed}>
                {this.props.fileName[index]}
             </button>
           </span>
          )}
          <div>
          <GoogleMaps
          locationData = {this.state.dataToMap}
          fileID = {this.state.fileID}
          />

          </div>

      </div>
    )

  }
}

export default RecentlySaved