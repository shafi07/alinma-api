const CREATE_NEW_WORK = `INSERT INTO work (name,id_number,
    total_amount,paid_amount,agent,mobileNumber,createdUser,updatedUser,sub_category,sponser_name,agent_amount,service,paid_date,remarks,amount_paid_dates) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,ARRAY[$15]::json[])`

const GET_ALL_WORK = `SELECT DISTINCT ON(createdTime) id,name,id_number,sponser_name,amount_paid_dates,createdTime,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_WORK_QUERY = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_WORK_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE status = $1  LIMIT 100`

const GET_ALL_WORK_QUERY_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE (fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const GET_ALL_WORK_CREDIT = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE balance_amount != '0'  LIMIT 100`

const GET_ALL_WORK_CREDIT_QUERY = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE (fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%') AND balance_amount != '0'  LIMIT 100`

const UPDATE_WORK = `UPDATE work SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2), amount_paid_dates = amount_paid_dates || $3::jsonb WHERE id = $1`

const UPDATE_WORK_STATUS = `UPDATE work SET modifiedTime = current_timestamp, status = $2 WHERE id = $1`

const DELETE_WORK = `DELETE FROM work WHERE id = $1`

module.exports = {
    CREATE_NEW_WORK,
    GET_ALL_WORK,
    DELETE_WORK,
    UPDATE_WORK,
    GET_ALL_WORK_QUERY,
    GET_ALL_WORK_STATUS,
    GET_ALL_WORK_QUERY_STATUS,
    UPDATE_WORK_STATUS,
    GET_ALL_WORK_CREDIT,
    GET_ALL_WORK_CREDIT_QUERY
}