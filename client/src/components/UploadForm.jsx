import React from 'react';
import axios from 'axios';
import MapCSVForm from './MapCSVForm.jsx';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      fileUploaded: false,
      uploadComplete: false,
      fileName: [],
      file: null,
      originalData: null,
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      fileSelected: false,
      fileUploaded: false,
      uploadComplete: false,
    });
  }

  handleFile(e) {
    // e.preventDefault();
    const uploadedFile = e.target.files[0];

    this.setState({
      file: uploadedFile,
      fileSelected: true,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      file, fileName, uploadComplete, fileSelected,
    } = this.state;
    const data = new FormData();
    data.append('file', file);

    axios({
      url: '/uploadcsv',
      method: 'post',
      data,
    })
      .then(res => this.setState({
        fileName: [...fileName, ...[res.data.fileName]],
        fileUploaded: true,
        uploadComplete: !uploadComplete,
        fileSelected: !fileSelected,
        originalData: res.data.originalData,
      }))
      .then(() => {
        if (fileName.length > 3) {
          const newstate = fileName;
          newstate.shift();
          this.setState({
            fileName: newstate,
          });
        }
      })
      .then(() => {
        document.getElementById('mapFormContainer').style.display = 'block';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      fileUploaded, fileSelected, uploadComplete, originalData, fileName,
    } = this.state;
    return (
      <div className="app-contents">
        <div id="uploadform" style={{ display: 'none' }}>
          <p>Upload your csv file</p>
          <form id="uploadCSV" name="csvFileForm" onSubmit={this.handleSubmit}>
            <input
              className="csvUpload"
              accept=".csv"
              type="file"
              onChange={this.handleFile}
            />
            <div>
              <button
                className="csvUploadBtn"
                disabled={!fileSelected}
                type="submit"
              >
                {uploadComplete ? 'done' : 'upload'}
              </button>
            </div>
          </form>
        </div>

        <MapCSVForm
          uploadStatus={fileUploaded}
          fileName={fileName}
          resetState={this.resetState}
          originalData={originalData}
        />
      </div>
    );
  }
}

export default UploadForm;
