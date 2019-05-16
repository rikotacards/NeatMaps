import React from 'react';
import axios from 'axios';


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      uploadStatus: false,
      file: null,
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFile(e){
    e.preventDefault();
    var uploadedFile = e.target.files[0]
    console.log(uploadedFile)

    this.setState({
      file: uploadedFile
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
    .then((res)=>console.log(res))

  }

  render(){
    return(
      <div>
        <p>upload your csv file</p>
        <form name ='csvFileForm' onSubmit = {this.handleSubmit}>
          <input type='file' onChange = {this.handleFile}></input>
          <button type = 'submit'>upload</button>
        </form>

      </div>
    )
  }
}

export default App