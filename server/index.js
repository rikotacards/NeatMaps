var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var port = 3000;
var multer = require('multer')
var upload = multer({dest:'temp/csv/'})

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(bodyParser.json());


app.post('/uploadcsv',upload.single('file'), (req,res) => {
  console.log(req.file.path)
})


app.listen(port,(err,result) => {
  if(err){
    console.log(err)
  } else {
    console.log(`server listening on ${port}`)
  }
})