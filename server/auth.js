var axios = require('axios')



var auth = () => {

  axios({
    url:"http://neat-mvp-api.herokuapp.com/v1/auth",
    method:'POST',
    headers:{
      'email':'neatmaps@gmail.com',
      'password':12345
    }
  })
  .then((res)=> {
    console.log(res.data)
  })
  .catch((error)=>{
    console.log('error', error.config)
  })
}

auth()

// '{"id":"user_5YH84sGPej4n43o","created_at":1558122533,"email":"neatmaps@gmail.com","first_name":null,"last_name":null,"admin":true,"account":{"id":153,"uuid":"acc_RFbnbtDXDhg9hoYf","created_at":"2019-05-17 19:48:53 +0000","balance":"0.3E4","name":"1","status":"active","livemode":true,"user_id":155,"card_number":"1111222233334444"}}'

// `{"id":"user_5YH84sGPej4n43o","created_at":1558122533,"email":"neatmaps@gmail.com","first_name":null,"last_name":null,"admin":true,"account":{"id":153,"uuid":"acc_RFbnbtDXDhg9hoYf","created_at":"2019-05-17 19:48:53 +0000","balance":"0.3E4","name":"1","status":"active","livemode":true,"user_id":155,"card_number":"1111222233334444"}}`