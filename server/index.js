var express = require('express');
var cors = require('cors')
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var port = 3000;
var multer = require('multer')
var upload = multer({dest:'temp/csv/'})
var process = require('../DataProcessing/ProcessCSV.js')
var Geocoding = require('../DataProcessing/GeocodeService')
var auth = require('./Auth.js')

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
  var originalData = await process.returnOriginalData(filePath)
  var returnObject = {fileName: fileName, originalData: originalData}


  res.status(200).json(returnObject)
})

app.post('/mapdata', upload.none(), async(req,res) => {
  try{

    var headerMapping = req.body
    var data = await process.mapHeader(headerMapping, filePath)
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

app.listen(port,(err,result) => {
  if(err){
    console.log(err)
  } else {
    console.log(`server listening on ${port}`)
  }
})