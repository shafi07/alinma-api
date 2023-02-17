const CREATE_NEW_INSURANCE = `INSERT INTO insurance (name,id_number,dob,
    total_amount,paid_amount,agent,mobileNumber,createdUser,updatedUser,sub_category,sponser_name,service,agent_amount,paid_date,remarks,amount_paid_dates,company) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,ARRAY[$16]::json[],$17)`

const GET_ALL_INSURANCE = `SELECT DISTINCT ON(createdTime) id,name,id_number,dob,sponser_name,status,service,agent_amount,paid_date,remarks,amount_paid_dates,createdTime,company,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,count(*) OVER() AS full_count
    FROM insurance ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_INSURANCE_QUERY = `SELECT id,name,id_number,dob,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdTime,company,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,service,agent_amount,paid_date,remarks,amount_paid_dates
    FROM insurance WHERE name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_INSURANCE_STATUS = `SELECT id,name,id_number,dob,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdTime,company,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,service,agent_amount,paid_date,remarks,amount_paid_dates
    FROM insurance WHERE status = $1  LIMIT 100`

const GET_ALL_INSURANCE_QUERY_STATUS = `SELECT id,name,id_number,dob,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdTime,company,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,service,agent_amount,paid_date,remarks,amount_paid_dates
    FROM insurance WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const GET_ALL_INSURANCE_CRRDIT = `SELECT id,name,id_number,dob,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdTime,company,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,service,agent_amount,paid_date,remarks,amount_paid_dates
    FROM insurance WHERE balance_amount != '0'  LIMIT 100`

const GET_ALL_INSURANCE_CREDIT_QUERY = `SELECT id,name,id_number,dob,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdTime,company,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId,status,service,agent_amount,paid_date,remarks,amount_paid_dates
    FROM insurance WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%') AND balance_amount != '0'  LIMIT 100`

const UPDATE_INSURANCE = `UPDATE insurance SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2), amount_paid_dates = amount_paid_dates || $3::jsonb WHERE id = $1`

const UPDATE_INSURANCE_STATUS = `UPDATE insurance SET modifiedTime = current_timestamp, status = $2 WHERE id = $1`

const UPDATE_INSURANCE_AGENT_DETAILS = `UPDATE insurance SET agent = $2, agent_amount = $3, paid_date = $4 WHERE id = $1`

const DELETE_INSURANCE = `DELETE FROM insurance WHERE id = $1`

const PATCH_INSURANCE = `UPDATE insurance SET agent = $2, agent_amount = $3, paid_date = $4, name = $5, id_number = $6, dob = $7, total_amount = $8, mobileNumber = $9, sub_category = $10,
sponser_name = $11, service = $12, remarks = $13, company = $14 WHERE id = $1`

module.exports = {
    CREATE_NEW_INSURANCE,
    GET_ALL_INSURANCE,
    DELETE_INSURANCE,
    UPDATE_INSURANCE,
    PATCH_INSURANCE,
    GET_ALL_INSURANCE_QUERY,
    GET_ALL_INSURANCE_STATUS,
    GET_ALL_INSURANCE_QUERY_STATUS,
    UPDATE_INSURANCE_STATUS,
    GET_ALL_INSURANCE_CRRDIT,
    GET_ALL_INSURANCE_CREDIT_QUERY,
    UPDATE_INSURANCE_AGENT_DETAILS
}