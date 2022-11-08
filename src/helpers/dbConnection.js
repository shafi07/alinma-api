const { Pool } = require('pg')
const NEW_STRING = `postgres://ubuntu:password@ec2-3-110-216-253.ap-south-1.compute.amazonaws.com:5432/alinma-dev`

const client = new Pool({
    // connectionString: 'postgres://shafi_07:shafi123@alinma.ccj1mloxjvmp.ap-south-1.rds.amazonaws.com:5432/alinama_test',
    connectionString:NEW_STRING,
    connectionTimeoutMillis:100000
})

client.connect().catch(error => {
    console.log(error)
})

exports.client = client