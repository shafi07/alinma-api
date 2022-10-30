const commonQuery = require('../models/commonQueryModel')
const userQuery = require('../queries/userQueries')

module.exports = {
    async userLogin(req, res) {
        try {
            const { userName, password } = req.body
            if (!userName || !password) {
                return res.status(400).json({ isSuccess: false, message: "Required field is missing !" });
            }
            const user = await validateUser(userName,password)
            return user ? res.json(user) : res.status(400).json({ message: "username or Password Does not match" });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function validateUser(userName, password) { 
    try {

        result = await commonQuery.exexuteQuery(userQuery.USER_LOGIN, [userName, password])

        return result.rows && result.rows.length > 0 ? result.rows[0] : null


    } catch (error) {
        console.log(error)
    }
}