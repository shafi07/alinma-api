const { Pool } = require('pg')

const client = new Pool({
    connectionString: 'postgres://shafi_07:shafi123@alinma.ccj1mloxjvmp.ap-south-1.rds.amazonaws.com:5432/alinama_test',
    connectionTimeoutMillis:100000
})

client.connect().catch(error => {
    console.log(error)
})

exports.client = client