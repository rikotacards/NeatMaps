//Converts CSV file to JSON file with user defined column mapping
var csv = require('csvtojson')

var returnOriginalData = async(file) => {
  try{
    var headerData = ['col1', 'col2', 'col3', 'col4', 'col5'];

    var csvJson = await csv({
      noheader:true,
      headers: headerData
    })
    .fromFile(file)
    console.log(csvJson)
    return csvJson
  } catch(error) {
    console.log(error)
  }
}

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
    console.log(csvJson)
    return csvJson

  } catch(err){
    console.log(err)
  }
}


module.exports ={
  mapHeader: mapHeader,
  returnOriginalData: returnOriginalData
}




