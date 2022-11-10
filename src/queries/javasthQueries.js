const CREATE_NEW_JAVASATH = `INSERT INTO javasath (sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,createdUser,updatedUser,mol,sub_category) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`

const GET_ALL_JAVASATH = `SELECT DISTINCT ON(createdTime) id,sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,createdTime,fileId
FROM javasath ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_JAVASATH_QUERY = `SELECT id,sponser_name,name,id_number,purpose,iqama,insurance,other,
total_amount,paid_amount,service,mobileNumber,mol,sub_category,balance_amount,createdTime,fileId
FROM javasath WHERE LOWER(fileId) = LOWER($1) OR LOWER(name) = LOWER($1)  LIMIT 100`

const UPDATE_JAVASATH = `UPDATE javasath SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2) WHERE id = $1`

const DELETE_JAVASATH = `DELETE FROM javasath WHERE id = $1`

module.exports = {
    CREATE_NEW_JAVASATH,
    GET_ALL_JAVASATH,
    GET_ALL_JAVASATH_QUERY,
    DELETE_JAVASATH,
    UPDATE_JAVASATH
}