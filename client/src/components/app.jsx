import React from 'react';
import axios from 'axios';
import MapCSVForm from './MapCSVForm.jsx';
import GoogleMaps from './GoogleMaps.jsx'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      fileSelected: false,
      fileUploaded:false,
      fileName:null,
      file: null,
      filePath:null,
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFile(e){
    e.preventDefault();
    var uploadedFile = e.target.files[0]
    console.log(uploadedFile)

    this.setState({
      file: uploadedFile,
      fileSelected: true
    })
  }

  handleSubmit(e){
    e.preventDefault();
    var file = this.state.file
    var data = new FormData()
    data.append('file', file)

    axios({
      url:'/uploadcsv',
      method:'post',
      data: data
    })
    .then((res)=>this.setState({
      fileName:res.data,
      fileUploaded: true
    }))

  }

  render(){
    return(
      <div>
        <p>upload your csv file</p>
        <form name ='csvFileForm' onSubmit = {this.handleSubmit}>
          <input type='file' onChange = {this.handleFile}></input>
          <button disabled = {!this.state.fileSelected} type = 'submit'>upload</button>
        </form>
        <MapCSVForm
          uploadStatus = {this.state.fileUploaded}
          fileName = {this.state.fileName}
          />
      </div>
    )
  }
}

export default App