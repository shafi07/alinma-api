const CREATE_NEW_JAVASATH = `INSERT INTO javasath (sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,createdUser,updatedUser,mol,sub_category,remarks) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`

const GET_ALL_JAVASATH = `SELECT DISTINCT ON(createdTime) id,sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,createdTime,fileId,status,count(*) OVER() AS full_count
FROM javasath ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_JAVASATH_QUERY = `SELECT DISTINCT ON(fileId,name) id,sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,createdTime,fileId,status
FROM javasath WHERE fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%'  LIMIT 100`

const GET_ALL_JAVASATH_STATUS = `SELECT DISTINCT ON(fileId,name) id,sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,createdTime,fileId,status
FROM javasath WHERE status=$1`

const GET_ALL_JAVASATH_STATUS_QUERY = `SELECT DISTINCT ON(fileId,name) id,sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,createdTime,fileId,status
FROM javasath WHERE (fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%') AND status=$2  LIMIT 100`

const UPDATE_JAVASATH = `UPDATE javasath SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2) WHERE id = $1`

const DELETE_JAVASATH = `DELETE FROM javasath WHERE id = $1`

module.exports = {
    CREATE_NEW_JAVASATH,
    GET_ALL_JAVASATH,
    GET_ALL_JAVASATH_QUERY,
    GET_ALL_JAVASATH_STATUS,
    GET_ALL_JAVASATH_STATUS_QUERY,
    DELETE_JAVASATH,
    UPDATE_JAVASATH
}