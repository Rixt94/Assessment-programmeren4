const settings = require('../config/config.json');
const moment = require('moment');
const jwt = require('jwt-simple');
const db = require('../config/db');

//
// Encode (van username naar token)
//

encodeToken = (id, email) => {
  const playload = {
    exp: moment().add(10, 'days').unix(),
    iat: moment().unix(),
    sub: id,
    val: email
  };
  return jwt.encode(playload, settings.secretkey);
}

//
// Decode (van token naar username)
//

let decodeToken = (token, cb) => {
  try {
    const payload = jwt.decode(token, settings.secretkey);

    // Check if the token has expired. To do: Trigger issue in db ..
    const now = moment().unix();

    // Check if the token has expired
    if (now > payload.exp) {
      console.log('Token has expired.');
    }

    // Return
    cb(null, payload);

  } catch(err) {
    cb(err, null);
  }
}

module.exports = {encodeToken, decodeToken};


