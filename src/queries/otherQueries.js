const CREATE_NEW_OTHER = `INSERT INTO other (name,id_number,
    total_amount,paid_amount,mobileNumber,createdUser,updatedUser,sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,amount_paid_dates) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,ARRAY[$15]::json[])`

const GET_ALL_OTHER = `SELECT DISTINCT ON(createdTime) id,name,id_number,sponser_name,amount_paid_dates,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM other ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_OTHER_QUERY = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM other WHERE fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_OTHER_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM other WHERE status = $1 LIMIT 100`

const GET_ALL_OTHER_QUERY_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM other WHERE (fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const GET_ALL_OTHER_CREDIT = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM other WHERE balance_amount != '0' LIMIT 100`

const GET_ALL_OTHER_CREDIT_QUERY = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
    FROM other WHERE (fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%') AND balance_amount != '0' LIMIT 100`

const UPDATE_OTHER = `UPDATE other SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2), amount_paid_dates = amount_paid_dates || $3::jsonb WHERE id = $1`

const UPDATE_OTHER_STATUS = `UPDATE other SET modifiedTime = current_timestamp, status = $2 WHERE id = $1`

const DELETE_OTHER = `DELETE FROM other WHERE id = $1`

module.exports = {
    CREATE_NEW_OTHER,
    GET_ALL_OTHER,
    DELETE_OTHER,
    UPDATE_OTHER,
    GET_ALL_OTHER_QUERY,
    GET_ALL_OTHER_STATUS,
    GET_ALL_OTHER_QUERY_STATUS,
    UPDATE_OTHER_STATUS,
    GET_ALL_OTHER_CREDIT,
    GET_ALL_OTHER_CREDIT_QUERY
}