/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import axios from 'axios';
import RecentlySaved from './RecentlySaved.jsx';

class MapCSVForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        'ADDRESS',
        'CITY',
        'STATE',
        'ZIPCODE',
        'CATEGORY',
      ],
      data: [],
      mapConfirmed: false,
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetMapConfirmed = this.resetMapConfirmed.bind(this);
  }

  resetMapConfirmed() {
    this.setState({
      mapConfirmed: false,
    });
  }

  handleSubmit(e) {
    const { filePath, resetState } = this.props;
    const { data } = this.state;
    e.preventDefault();
    const form = e.target;
    const dataUpload = new FormData(form);
    dataUpload.append('file', filePath);

    this.setState({
      loading: true,
    });

    axios({
      url: '/mapdata',
      method: 'post',
      data: dataUpload,
    })
      .then((res) => {
        this.setState({
          data: [...data, ...[res.data]],
          mapConfirmed: true,
          loading: false,
        });
      })
      .then(() => {
        if (data.length > 3) {
          const newstate = data;
          newstate.shift();
          this.setState({
            data: newstate,
          });
        }
      })
      .then(() => {
        document.getElementById('uploadform').style.display = 'none';

        document.getElementById('mapFormContainer').style.display = 'none';
      })
      .then(() => {
        resetState();
        this.resetMapConfirmed();
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    let pStyle = { color: 'lightgray' };
    const {
      uploadStatus, originalData, fileName, resetState,
    } = this.props;
    const {
      options, mapConfirmed, loading, data,
    } = this.state;
    if (uploadStatus) {
      pStyle = { color: 'black' };
    }

    const displayOriginal = [];
    if (originalData) {
      for (let i = 0; i < 4; i += 1) {
        displayOriginal.push(originalData[i]);
      }
    }

    return (
      <span>
        <div id="mapFormContainer" style={{ display: 'none' }}>
          <p style={pStyle}>Assign column mapping </p>
          <p className="preview-disclaimer">
            *Below is a preview of your original data
          </p>
          <form
            id="col-map-form"
            name="mapForm"
            onSubmit={this.handleSubmit}
          >
            <div className="headermap">
              {options.map((i, index) => (
                <div
                  style={pStyle}
                  className={`label column${index + 1}`}
                  key={index}
                >
                  column
                  {index + 1}
                  <div className={` select selector${index + 1}`}>
                    <select
                      disabled={!uploadStatus}
                      name={index}
                    >
                      {options.map((ops, idx) => (
                        <option key={idx} value={ops}>
                          {ops}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="table-wrapper">
              <table className="preview-table">
                <tbody>
                  {displayOriginal.map((rows, index) => (
                    <tr key={index}>
                      <td>{rows.col1}</td>
                      <td>{rows.col2}</td>
                      <td>{rows.col3}</td>
                      <td>{rows.col4}</td>
                      <td>{rows.col5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="column-mapping-load">
              {loading ? 'loading...' : null}
            </div>

            <button
              className="confirmMapping"
              disabled={
                !uploadStatus === !mapConfirmed
              }
              type="submit"
            >
              {mapConfirmed ? 'done' : 'Confirm mapping'}
            </button>
          </form>
        </div>

        <p> Add data to map</p>

        <RecentlySaved
          fileName={fileName}
          mapConfirmed={mapConfirmed}
          locationData={data}
          resetState={resetState}
          resetMapConfirmed={this.resetMapConfirmed}
        />
      </span>
    );
  }
}

export default MapCSVForm;
