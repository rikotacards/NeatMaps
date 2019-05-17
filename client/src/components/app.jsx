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
      uploadComplete:false,
      fileName:[],
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
    },()=>console.log(uploadedFile))
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
      fileName:[...this.state.fileName,...[res.data]],
      fileUploaded: true,
      uploadComplete:!this.state.uploadComplete,
      fileSelected:!this.state.fileSelected
    },()=>console.log(this.state.fileName)))
    .then(()=>{
      if(this.state.fileName.length>3){
        var newstate = this.state.fileName;
        newstate.shift()
        this.setState({
          fileName: newstate
        })
      }
    })


  }

  render(){


    return(
      <div>
        <p>upload your csv file</p>
        <form id = 'uploadCSV' name ='csvFileForm' onSubmit = {this.handleSubmit}>
          <input type='file' onChange = {this.handleFile}></input>
          <div>
          <button disabled = {!this.state.fileSelected} type = 'submit'>{this.state.uploadComplete? 'done':'upload'}</button>
          </div>
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