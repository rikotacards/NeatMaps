var axios = require('axios')


var auth = async(email, password) => {
  try{

    if(!email || !password){
      return false
    }

    var path = "http://neat-mvp-api.herokuapp.com/v1/auth"

    var result = await axios({
      url: path,
      method:'POST',
      data:`email=${email}&password=${password}`})

      return result.data
  } catch(error){

    return error
  }
}

module.exports = {
  auth:auth
}
