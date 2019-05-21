// require('dotenv').config({path:__dirname +'/../.env'})
// console.log(process.env.port)
var express = require('express');
var cors = require('cors')
var app = express();
var path = require('path');
var bodyParser = require('body-parser')

var multer = require('multer')
var upload = multer({dest:'temp/csv/'})
var processData = require('../DataProcessing/ProcessCSV.js')
var Geocoding = require('../DataProcessing/GeocodeService')
var auth = require('./auth.js')

const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, './../client/dist')))
app.use(cors())
app.use(bodyParser.json());

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname,'../client/dist/' ))
})

var filePath;

app.post('/uploadcsv',upload.single('file'), async(req,res) => {

  var fileName = req.file.originalname
  filePath = req.file.path

  //new section, trying to create data preview
  var originalData = await processData.returnOriginalData(filePath)
  var returnObject = {fileName: fileName, originalData: originalData}


  res.status(200).json(returnObject)
})

app.post('/mapdata', upload.none(), async(req,res) => {
  try{

    var headerMapping = req.body
    var data = await processData.mapHeader(headerMapping, filePath)
    var dataWithCoordinates = await Geocoding.convertToGeocode(data)

    res.status(200).json(dataWithCoordinates)

  } catch(err){
    console.log(err)
  }
})

app.post('/authenticate',async(req,res) =>{

  try {

    var email = req.body.email
    var password = req.body.password
    var result =  await auth.auth(email,password)

    if(!result){
      res.status(401).json(error)
    } else {
      res.status(200).json(result)
    }

  } catch (error) {
    res.status(401).json(error)
  }
})

app.listen(PORT,(err,result) => {
  if(err){
    console.log('here', err)
  } else {
    console.log(`server listening ${PORT}`)
  }
})