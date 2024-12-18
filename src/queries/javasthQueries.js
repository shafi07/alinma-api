const CREATE_NEW_JAVASATH = `INSERT INTO javasath (sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,createdUser,updatedUser,mol,sub_category,remarks,amount_paid_dates,agent,agent_amount,paid_date,professionName,newSponser,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date,re_entry_type,boarder_number) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,ARRAY[$17]::json[],$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30)`

const GET_ALL_JAVASATH = `SELECT DISTINCT ON(createdTime) id,sponser_name,name,id_number,purpose,iqama,insurance,other,amount_paid_dates,remarks,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,boarder_number,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdDate,fileId,status,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath ORDER BY createdTime DESC LIMIT 300`

const GET_ALL_JAVASATH_QUERY = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,boarder_number,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdDate,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%' LIMIT 200`

const GET_ALL_JAVASATH_STATUS = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,boarder_number,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdDate,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE status=$1`

const GET_ALL_JAVASATH_STATUS_QUERY = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,boarder_number,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdDate,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%') AND status = $2  LIMIT 200`

const GET_ALL_JAVASATH_CREDIT = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,boarder_number,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdDate,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE balance_amount != '0'`

const GET_ALL_JAVASATH_QUERY_CREDIT = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,agent,agent_amount,paid_date,professionName,newSponser,re_entry_type,boarder_number,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,to_char(createdTime,'DD/MM/YYYY') createdDate,fileId,status,amount_paid_dates,remarks,due,absheer_amount,qiwa_amount,government_fee,new_passport_number,expiry_date
FROM javasath WHERE (name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%') AND balance_amount != '0'  LIMIT 200`

const UPDATE_JAVASATH = `UPDATE javasath SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2), amount_paid_dates = amount_paid_dates || $3::jsonb WHERE id = $1`

const UPDATE_JAVASATH_STATUS = `UPDATE javasath SET modifiedTime = current_timestamp, status = $2,
remarks = CASE WHEN $2::VARCHAR = 'returned' THEN (remarks || '--Returned On--' || $3) ELSE remarks END 
WHERE id = $1` 

const UPDATE_JAVASATH_AGENT_DETAILS = `UPDATE javasath SET agent = $2, agent_amount = $3, paid_date = $4 WHERE id = $1`

const DELETE_JAVASATH = `DELETE FROM javasath WHERE id = $1`

const PATCH_JAVASATH = `UPDATE javasath SET agent = $2, agent_amount = $3, paid_date = $4, sponser_name = $5, name = $6, id_number = $7, purpose = $8, iqama = $9, insurance = $10,
other = $11, total_amount = $12, service = $13, mobileNumber = $14, mol = $15, sub_category = $16, remarks = $17, professionName = $18, newSponser = $19, due = $20,absheer_amount=$21, 
qiwa_amount=$22,government_fee=$23,new_passport_number=$24,expiry_date=$25,re_entry_type=$26,boarder_number =$27, status = $28 WHERE id = $1`

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