const CREATE_NEW_WORK = `INSERT INTO work (name,id_number,
    total_amount,paid_amount,agent,mobileNumber,createdUser,updatedUser,sub_category,sponser_name,agent_amount,service,paid_date,remarks,amount_paid_dates,government_fee) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,ARRAY[$15]::json[],$16)`

const GET_ALL_WORK = `SELECT DISTINCT ON(createdTime) id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,government_fee,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work ORDER BY createdTime DESC LIMIT 50`

const GET_ALL_WORK_QUERY = `SELECT id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,government_fee,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_WORK_STATUS = `SELECT id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,government_fee,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE status = $1  LIMIT 100`

const GET_ALL_WORK_QUERY_STATUS = `SELECT id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,government_fee,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const GET_ALL_WORK_CREDIT = `SELECT id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,government_fee,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE balance_amount != '0'  LIMIT 100`

const GET_ALL_WORK_CREDIT_QUERY = `SELECT id,name,id_number,sponser_name,amount_paid_dates,to_char(createdTime,'DD/MM/YYYY') createdTime,government_fee,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,agent_amount,service,paid_date,remarks
    FROM work WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%') AND balance_amount != '0'  LIMIT 100`

const UPDATE_WORK = `UPDATE work SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2), amount_paid_dates = amount_paid_dates || $3::jsonb WHERE id = $1`

const UPDATE_WORK_STATUS = `UPDATE work SET modifiedTime = current_timestamp, status = $2,
remarks = CASE WHEN $2::VARCHAR = 'returned' THEN (remarks || '--Returned On--' || $3) ELSE remarks END 
WHERE id = $1`

const UPDATE_WORK_AGENT_DETAILS = `UPDATE work SET agent = $2, agent_amount = $3, paid_date = $4 WHERE id = $1`

const DELETE_WORK = `DELETE FROM work WHERE id = $1`

const PATCH_WORK = `UPDATE work SET agent = $2, agent_amount = $3, paid_date = $4, name = $5, id_number = $6, total_amount = $7, mobileNumber = $8,
sub_category = $9, sponser_name = $10, service = $11, remarks = $12, government_fee = $13 WHERE id = $1`

module.exports = {
    CREATE_NEW_WORK,
    GET_ALL_WORK,
    DELETE_WORK,
    UPDATE_WORK,
    PATCH_WORK,
    GET_ALL_WORK_QUERY,
    GET_ALL_WORK_STATUS,
    GET_ALL_WORK_QUERY_STATUS,
    UPDATE_WORK_STATUS,
    GET_ALL_WORK_CREDIT,
    GET_ALL_WORK_CREDIT_QUERY,
    UPDATE_WORK_AGENT_DETAILS
}