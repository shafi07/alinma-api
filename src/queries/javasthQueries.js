const CREATE_NEW_JAVASATH = `INSERT INTO javasath (sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,createdUser,updatedUser,mol,sub_category,remarks,amount_paid_dates,agent,agent_amount,paid_date,professionName,newSponser,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date,re_entry_type) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,ARRAY[$17]::json[],$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29)`

const GET_ALL_JAVASATH = `SELECT DISTINCT ON(createdTime) id,sponser_name,name,id_number,purpose,iqama,insurance,other,amount_paid_dates,remarks,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,createdTime,fileId,status,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath ORDER BY createdTime DESC LIMIT 50`

const GET_ALL_JAVASATH_QUERY = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdTime,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%' LIMIT 100`

const GET_ALL_JAVASATH_STATUS = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdTime,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE status=$1`

const GET_ALL_JAVASATH_STATUS_QUERY = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdTime,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const GET_ALL_JAVASATH_CREDIT = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdTime,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE balance_amount != '0'`

const GET_ALL_JAVASATH_QUERY_CREDIT = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdTime,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%') AND balance_amount != '0'  LIMIT 100`

const UPDATE_JAVASATH = `UPDATE javasath SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2), amount_paid_dates = amount_paid_dates || $3::jsonb WHERE id = $1`

const UPDATE_JAVASATH_STATUS = `UPDATE javasath SET modifiedTime = current_timestamp, status = $2,
remarks = CASE WHEN $2::VARCHAR = 'returned' THEN (remarks || '--Returned On--' || $3) ELSE remarks END 
WHERE id = $1` 

const UPDATE_JAVASATH_AGENT_DETAILS = `UPDATE javasath SET agent = $2, agent_amount = $3, paid_date = $4 WHERE id = $1`

const DELETE_JAVASATH = `DELETE FROM javasath WHERE id = $1`

const PATCH_JAVASATH = `UPDATE javasath SET agent = $2, agent_amount = $3, paid_date = $4, sponser_name = $5, name = $6, id_number = $7, purpose = $8, iqama = $9, insurance = $10,
other = $11, total_amount = $12, paid_amount = $13, service = $14, mobileNumber = $15, mol = $16, sub_category = $17, remarks = $18, professionName = $19, newSponser = $20, due = $21,absheer_amount=$22,qiwa_amount=$23,government_fee=$24,new_passport_number=$25,expiry_date=$26,re_entry_type=$27 WHERE id = $1`

module.exports = {
    CREATE_NEW_JAVASATH,
    GET_ALL_JAVASATH,
    GET_ALL_JAVASATH_QUERY,
    GET_ALL_JAVASATH_STATUS,
    GET_ALL_JAVASATH_STATUS_QUERY,
    DELETE_JAVASATH,
    UPDATE_JAVASATH,
    PATCH_JAVASATH,
    UPDATE_JAVASATH_STATUS,
    GET_ALL_JAVASATH_CREDIT,
    GET_ALL_JAVASATH_QUERY_CREDIT,
    UPDATE_JAVASATH_AGENT_DETAILS
}