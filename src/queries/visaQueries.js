const CREATE_NEW_VISA = `INSERT INTO visa (name,id_number,
    total_amount,paid_amount,mobileNumber,createdUser,updatedUser,sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,visa_number,amount_paid_dates,chamber_amount) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,ARRAY[$16]::json[],$17)`

const GET_ALL_VISA = `SELECT DISTINCT ON(createdTime) id,name,id_number,sponser_name,visa_number,createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks,chamber_amount,amount_paid_dates
    FROM visa ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_VISA_QUERY = `SELECT id,name,id_number,sponser_name,visa_number,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks,chamber_amount,amount_paid_dates
    FROM visa WHERE name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_VISA_STATUS = `SELECT id,name,id_number,sponser_name,visa_number,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks,chamber_amount,amount_paid_dates
    FROM visa WHERE status = $1 LIMIT 100`

const GET_ALL_VISA_QUERY_STATUS = `SELECT id,name,id_number,sponser_name,visa_number,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks,chamber_amount,amount_paid_dates
    FROM visa WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const GET_ALL_VISA_CREDIT = `SELECT id,name,id_number,sponser_name,visa_number,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks,chamber_amount,amount_paid_dates
    FROM visa WHERE balance_amount != '0' LIMIT 100`

const GET_ALL_VISA_QUERY_CREDIT = `SELECT id,name,id_number,sponser_name,visa_number,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks,chamber_amount,amount_paid_dates
    FROM visa WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%') AND balance_amount != '0'  LIMIT 100`


const UPDATE_VISA = `UPDATE visa SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2), amount_paid_dates = amount_paid_dates || $3::jsonb WHERE id = $1`

const UPDATE_VISA_STATUS = `UPDATE visa SET modifiedTime = current_timestamp, status = $2 WHERE id = $1`

const UPDATE_VISA_AGENT_DETAILS = `UPDATE visa SET agent = $2, agent_amount = $3, paid_date = $4 WHERE id = $1`

const DELETE_VISA = `DELETE FROM visa WHERE id = $1`

module.exports = {
    CREATE_NEW_VISA,
    GET_ALL_VISA,
    DELETE_VISA,
    UPDATE_VISA,
    GET_ALL_VISA_QUERY,
    GET_ALL_VISA_STATUS,
    GET_ALL_VISA_QUERY_STATUS,
    UPDATE_VISA_STATUS,
    GET_ALL_VISA_CREDIT,
    GET_ALL_VISA_QUERY_CREDIT,
    UPDATE_VISA_AGENT_DETAILS
}