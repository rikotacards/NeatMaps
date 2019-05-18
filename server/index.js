var express = require('express');
var cors = require('cors')
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var port = 3000;
var multer = require('multer')
var upload = multer({dest:'temp/csv/'})
var process = require('./ProcessData.js')
var Geocoding = require('./Geocoding.js')

var auth = require('./auth.js')

app.use(express.static(path.join(__dirname, './../client/dist')))
app.use(cors())
app.use(bodyParser.json());



app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname,'../client/dist/' ))
})

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

    var data = await process.mapHeader(headerMapping, filePath)
    var dataWithCoordinates = await Geocoding.convertToGeocode(data)

    res.status(200).json(dataWithCoordinates)

  } catch(err){
    console.log(err)
  }
})

app.post('/authenticate',async(req,res) =>{
  var email = req.body.email
  var password = req.body.password
  console.log('here', await auth.auth(email,password))
})

app.listen(port,(err,result) => {
  if(err){
    console.log(err)
  } else {
    console.log(`server listening on ${port}`)
  }
})