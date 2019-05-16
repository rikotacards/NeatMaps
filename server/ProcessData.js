var csv = require('csvtojson');
var path = require('path')

var mapHeader = async (header, file) =>{
  try{
    var headerData = [];
    for(var i = 0; i <5; i++){
      headerData[Number(i)] = header[i]

    }
    var csvJson = await csv({
      noheader:true,
      headers: headerData
    })
    .fromFile(file)

    return csvJson

  } catch(err){
    console.log(err)
  }
}

module.exports ={
  mapHeader: mapHeader
}