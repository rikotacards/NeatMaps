/* eslint-disable consistent-return */
/* eslint-disable no-console */
const csv = require('csvtojson');

const returnOriginalData = async (file) => {
  try {
    const headerData = ['col1', 'col2', 'col3', 'col4', 'col5'];

    const csvJson = await csv({
      noheader: true,
      headers: headerData,
    })
      .fromFile(file);
    return csvJson;
  } catch (error) {
    console.log(error);
  }
};

const mapHeader = async (header, file) => {
  try {
    const headerData = [];
    for (let i = 0; i < 5; i += 1) {
      headerData[Number(i)] = header[i];
    }
    const csvJson = await csv({
      noheader: true,
      headers: headerData,
    })
      .fromFile(file);

    return csvJson;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  mapHeader,
  returnOriginalData,
};
