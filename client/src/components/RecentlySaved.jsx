import React from 'react';

class RecentlySaved extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <button disabled = {!this.props.mapConfirmed}>
          {this.props.fileName}
        </button>
      </div>
    )
  }
}

export default RecentlySaved