/* eslint-disable no-undef */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({
  dest: 'temp/csv/',
});
const processData = require('./dataProcessing/ProcessCSV.js').default;
const Geocoding = require('./dataProcessing/GeocodeService.js');
const auth = require('./Auth.js');

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, './../client/dist')));
app.use(cors());
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/'));
});

let filePath;

app.post('/uploadcsv', upload.single('file'), async (req, res) => {
  const fileName = req.file.originalname;
  filePath = req.file.path;

  const originalData = await processData.returnOriginalData(filePath);
  const returnObject = {
    fileName,
    originalData,
  };


  res.status(200).json(returnObject);
});

app.post('/mapdata', upload.none(), async (req, res) => {
  try {
    const headerMapping = req.body;
    const data = await processData.mapHeader(headerMapping, filePath);
    const dataWithCoordinates = await Geocoding.convertToGeocode(data);
    res.status(200).json(dataWithCoordinates);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
});

app.post('/authenticate', async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const result = await auth.auth(email, password);

    if (!result) {
      res.status(401).json(error);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('here', err);
  } else {
    console.log(`server listening ${PORT}`);
  }
});
