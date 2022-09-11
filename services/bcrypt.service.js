const bcrypt = require('bcrypt');
const saltRounds = 10;

class BcryptService {
    encryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds)
                .then((hash) => resolve(hash))
                .catch(err => reject(err));
        });
    }

    comparePassword({ password, hash }) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
}

module.exports = new BcryptService;