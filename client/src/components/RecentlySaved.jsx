/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import GoogleMaps from './GoogleMaps.jsx';

class RecentlySaved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToMap: null,
      fileID: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { locationData } = this.props;

    if (locationData !== prevProps.locationData) {
      const renderID = locationData.length - 1;
      this.setState({
        dataToMap: locationData[renderID],
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const { locationData } = this.props;

    this.setState({
      dataToMap: locationData[e.target.id],
      fileID: e.target.id,
    });
  }

  render() {
    const { locationData, fileName } = this.props;
    const { dataToMap, fileID } = this.state;
    return (
      <div>
        {locationData.map((i, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <span className="displayButton" key={index}>
            <button
              type="button"
              className="marker-controller-btn"
              onClick={this.handleClick}
              id={index}
            >
              {fileName[index]}
            </button>
          </span>
        ))}
        <button
          type="button"
          className="addData"
          onClick={() => {
            document.getElementById('uploadform').style.display = 'block';
            document.getElementById('uploadCSV').reset();
            document.getElementById('col-map-form').reset();
          }}
        >
          +
        </button>
        <div>
          <GoogleMaps
            locationData={dataToMap}
            fileID={fileID}
          />
        </div>
      </div>
    );
  }
}

export default RecentlySaved;
