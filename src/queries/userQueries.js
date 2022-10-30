
const USER_LOGIN = `SELECT username,id FROM users WHERE username = $1 AND password = $2`

module.exports = {
    USER_LOGIN
}