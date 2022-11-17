const CREATE_NEW_VISA = `INSERT INTO visa (name,id_number,
    total_amount,paid_amount,mobileNumber,createdUser,updatedUser,sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,visa_number) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`

const GET_ALL_VISA = `SELECT DISTINCT ON(createdTime) id,name,id_number,sponser_name,visa_number,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM visa ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_VISA_QUERY = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,visa_number,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM visa WHERE fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_VISA_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,visa_number,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM visa WHERE status = $1 LIMIT 100`

const GET_ALL_VISA_QUERY_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,visa_number,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM visa WHERE (fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const UPDATE_VISA = `UPDATE visa SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2) WHERE id = $1`

const UPDATE_VISA_STATUS = `UPDATE visa SET modifiedTime = current_timestamp, status = $2 WHERE id = $1`

const DELETE_VISA = `DELETE FROM visa WHERE id = $1`

module.exports = {
    CREATE_NEW_VISA,
    GET_ALL_VISA,
    DELETE_VISA,
    UPDATE_VISA,
    GET_ALL_VISA_QUERY,
    GET_ALL_VISA_STATUS,
    GET_ALL_VISA_QUERY_STATUS,
    UPDATE_VISA_STATUS
}