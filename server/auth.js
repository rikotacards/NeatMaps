const axios = require('axios');

const auth = async (email, password) => {
  try {
    const path = 'http://neat-mvp-api.herokuapp.com/v1/auth';

    const result = await axios({
      url: path,
      method: 'POST',
      data: `email=${email}&password=${password}`,
    });

    return result.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  auth,
};
