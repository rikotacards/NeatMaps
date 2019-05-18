var axios = require('axios')



var auth = async(email, password) => {
  try{

    var path = "http://neat-mvp-api.herokuapp.com/v1/auth"

    var result = await axios({
      url: path,
      method:'POST',
      data:`email=${email}&password=${password}`})
      console.log(result)
      return result

  } catch(error){
      console.log('unsucesful')
  }
}


module.exports = {
  auth:auth
}
