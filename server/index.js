var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var port = 3000;


app.listen(port,(err,result) => {
  if(err){
    console.log(err)
  } else {
    console.log(`server listening on ${port}`)
  }
})