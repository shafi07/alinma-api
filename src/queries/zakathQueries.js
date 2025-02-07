const CREATE_NEW_ZAKATH = `INSERT INTO zakath (name,id_number,
total_amount,paid_amount,mobileNumber,createdUser,updatedUser,sub_category,sponser_name,zareeba_date,purchase_amount,paid_date,service,remarks,sales_amount,amount_paid_dates) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,ARRAY[$16]::json[])`

const GET_ALL_ZAKATH = `SELECT DISTINCT ON(createdTime) id,name,id_number,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdDate,payment_method,sales_amount,purchase_amount,zareeba_date,
total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,paid_date,service,remarks,amount_paid_dates
FROM zakath ORDER BY createdTime DESC LIMIT 300`

const GET_ALL_ZAKATH_QUERY = `SELECT id,name,id_number,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdDate,payment_method,sales_amount,purchase_amount,zareeba_date,
total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,paid_date,service,remarks,amount_paid_dates
FROM zakath WHERE name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR fileId ILIKE '%' || $1 || '%'  LIMIT 200`

// const GET_ALL_VISA_QUERY = `SELECT id,name,id_number,sponser_name,visa_number,to_char(createdTime,'DD/MM/YYYY') createdDate,government_fee,
//     total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks,chamber_amount,amount_paid_dates
//     FROM visa WHERE CONCAT(name,mobileNumber,id_number,fileId) ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_ZAKATH_STATUS = `SELECT id,name,id_number,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdDate,payment_method,sales_amount,purchase_amount,zareeba_date,
total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,paid_date,service,remarks,amount_paid_dates
FROM zakath WHERE status = $1 LIMIT 200`

const GET_ALL_ZAKATH_QUERY_STATUS = `SELECT id,name,id_number,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdDate,payment_method,sales_amount,purchase_amount,zareeba_date,
total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,paid_date,service,remarks,amount_paid_dates
FROM zakath WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR fileId ILIKE '%' || $1 || '%') AND status = $2  LIMIT 200`

const GET_ALL_ZAKATH_CREDIT = `SELECT id,name,id_number,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdDate,payment_method,sales_amount,purchase_amount,zareeba_date,
total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,paid_date,service,remarks,amount_paid_dates
FROM zakath WHERE balance_amount != '0' LIMIT 200`

const GET_ALL_ZAKATH_QUERY_CREDIT = `SELECT id,name,id_number,sponser_name,to_char(createdTime,'DD/MM/YYYY') createdDate,payment_method,sales_amount,purchase_amount,zareeba_date,
total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,paid_date,service,remarks,amount_paid_dates
FROM zakath WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR fileId ILIKE '%' || $1 || '%') AND balance_amount != '0'  LIMIT 200`

const UPDATE_ZAKATH = `UPDATE zakath SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2), amount_paid_dates = amount_paid_dates || $3::jsonb WHERE id = $1`

const UPDATE_ZAKATH_STATUS = `UPDATE zakath SET modifiedTime = current_timestamp, status = $2,
remarks = CASE WHEN $2::VARCHAR = 'returned' THEN (remarks || '--Returned On--' || $3) ELSE remarks END 
WHERE id = $1`

const UPDATE_ZAKATH_AGENT_DETAILS = `UPDATE zakath SET agent = $2, agent_amount = $3, paid_date = $4 WHERE id = $1`

const DELETE_ZAKATH = `DELETE FROM zakath WHERE id = $1`

const PATCH_ZAKATH = `UPDATE zakath SET modifiedTime = current_timestamp, name = $2, id_number = $3, total_amount = $4, mobileNumber = $5, 
sub_category = $6, sponser_name = $7, service = $8, remarks = $9, zareeba_date = $10, purchase_amount = $11, sales_amount = $12, paid_date = $13, status = $14, payment_method = $15 WHERE id = $1`

module.exports = {
CREATE_NEW_ZAKATH,
GET_ALL_ZAKATH,
DELETE_ZAKATH,
UPDATE_ZAKATH,
PATCH_ZAKATH,
GET_ALL_ZAKATH_QUERY,
GET_ALL_ZAKATH_STATUS,
GET_ALL_ZAKATH_QUERY_STATUS,
UPDATE_ZAKATH_STATUS,
GET_ALL_ZAKATH_CREDIT,
GET_ALL_ZAKATH_QUERY_CREDIT,
UPDATE_ZAKATH_AGENT_DETAILS
}