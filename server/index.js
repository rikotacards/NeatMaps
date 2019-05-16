var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')))


app.listen(port,(err,result) => {
  if(err){
    console.log(err)
  } else {
    console.log(`server listening on ${port}`)
  }
})