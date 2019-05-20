import React from 'react';
import axios from 'axios';
import MapCSVForm from './MapCSVForm.jsx';




class UploadForm extends React.Component{
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
    this.resetState = this.resetState.bind(this)
  }

  resetState(){
    this.setState({
      fileSelected: false,
      fileUploaded:false,
      uploadComplete:false
    })
  }

  handleFile(e){
    // e.preventDefault();
    var uploadedFile = e.target.files[0]


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
      fileName:[...this.state.fileName,...[res.data]],
      fileUploaded: true,
      uploadComplete:!this.state.uploadComplete,
      fileSelected:!this.state.fileSelected
    }))
    .then(()=>{
      if(this.state.fileName.length>3){
        var newstate = this.state.fileName;
        newstate.shift()
        this.setState({
          fileName: newstate
        })
      }
    })
    .then(()=>{
      document.getElementById('mapFormContainer').style.display = 'block'
    })
    .catch((error)=>{
      console.log(error)
    })


  }

  render(){


    return(
      <div>
        <div id = 'uploadform' style = {{'display':'none'}}>
        <p>upload your csv file</p>
        <form id = 'uploadCSV' name ='csvFileForm' onSubmit = {this.handleSubmit}>
          <input className = 'csvUpload' accept = ".csv" type='file' onChange = {this.handleFile}></input>
          <div>

          <button className = 'csvUploadBtn' disabled = {!this.state.fileSelected} type = 'submit'>{this.state.uploadComplete? 'done':'upload'}</button>
          </div>
        </form>
        </div>

        <MapCSVForm
          uploadStatus = {this.state.fileUploaded}
          fileName = {this.state.fileName}
          resetState = {this.resetState}
          />
      </div>
    )
  }
}

export default UploadForm