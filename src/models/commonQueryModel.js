const connection = require('../helpers/dbConnection')

exports.exexuteQuery = async function (qry, data) {
    try {
        const qryResult = await connection.client.query(qry,data)
        // console.log(qryResult.rows[0])
        return qryResult
    } catch (error) {
        console.log(error) 
    }
}