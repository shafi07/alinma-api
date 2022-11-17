const CREATE_NEW_INSURANCE = `INSERT INTO insurance (name,id_number,dob,
    total_amount,paid_amount,agent,mobileNumber,createdUser,updatedUser,sub_category,sponser_name) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`

const GET_ALL_INSURANCE = `SELECT DISTINCT ON(createdTime) id,name,id_number,dob,sponser_name,status
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,count(*) OVER() AS full_count
    FROM insurance ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_INSURANCE_QUERY = `SELECT DISTINCT ON(fileId,name) id,name,id_number,dob,sponser_name,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status
    FROM insurance WHERE fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_INSURANCE_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,dob,sponser_name,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status
    FROM insurance WHERE status = $1  LIMIT 100`

const GET_ALL_INSURANCE_QUERY_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,dob,sponser_name,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status
    FROM insurance WHERE (fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const UPDATE_INSURANCE = `UPDATE insurance SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2) WHERE id = $1`

const UPDATE_INSURANCE_STATUS = `UPDATE insurance SET modifiedTime = current_timestamp, status = $2 WHERE id = $1`

const DELETE_INSURANCE = `DELETE FROM insurance WHERE id = $1`

module.exports = {
    CREATE_NEW_INSURANCE,
    GET_ALL_INSURANCE,
    DELETE_INSURANCE,
    UPDATE_INSURANCE,
    GET_ALL_INSURANCE_QUERY,
    GET_ALL_INSURANCE_STATUS,
    GET_ALL_INSURANCE_QUERY_STATUS,
    UPDATE_INSURANCE_STATUS
}