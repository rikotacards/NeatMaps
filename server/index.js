var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var port = 3000;
var multer = require('multer')
var upload = multer({dest:'temp/csv/'})
var process = require('./ProcessData.js')
var Geocoding = require('./Geocoding.js')

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(bodyParser.json());

var filePath;

app.post('/uploadcsv',upload.single('file'), (req,res) => {
  console.log('from upload button',  req.file.originalname)
  var fileName = req.file.originalname
  filePath = req.file.path

  res.status(200).json(fileName)
})

app.post('/mapdata', upload.none(), async(req,res) => {
  try{
    var headerMapping = req.body
    console.log(headerMapping)
    console.log('server filepath', filePath)
    var data = await process.mapHeader(headerMapping, filePath)
    var dataWithCoordinates = await Geocoding.convertToGeocode(data)


    console.log(dataWithCoordinates)
    res.status(200).json(dataWithCoordinates)



  } catch(err){
    console.log(err)
  }
})


app.listen(port,(err,result) => {
  if(err){
    console.log(err)
  } else {
    console.log(`server listening on ${port}`)
  }
})