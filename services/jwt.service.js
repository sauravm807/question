const jwt = require('jsonwebtoken');
const SECRETKEY = require("../config/config").JWTSECRETKEY;

class JwtService {
    createToken(userData) {
        return new Promise((resolve, reject) => {
            jwt.sign(userData, SECRETKEY, { expiresIn: '1h' }, function (err, token) {
                if (err) reject(err);
                resolve(token);
            });
        })
    }

    validateToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRETKEY, function(err, decoded) {
                if (err) reject(err);
                resolve(decoded);
              });
        })
    }
}

module.exports = new JwtService; 