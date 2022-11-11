const CREATE_NEW_WORK = `INSERT INTO work (name,id_number,
    total_amount,paid_amount,agent,mobileNumber,createdUser,updatedUser,sub_category,sponser_name) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`

const GET_ALL_WORK = `SELECT DISTINCT ON(createdTime) id,name,id_number,sponser_name,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId
    FROM work ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_WORK_QUERY = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,
    total_amount,paid_amount,agent,mobileNumber,sub_category,balance_amount,fileId
    FROM work WHERE fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%'  LIMIT 100`

const UPDATE_WORK = `UPDATE work SET modifiedTime = current_timestamp, paid_amount = (paid_amount + $2) WHERE id = $1`

const DELETE_WORK = `DELETE FROM work WHERE id = $1`

module.exports = {
    CREATE_NEW_WORK,
    GET_ALL_WORK,
    DELETE_WORK,
    UPDATE_WORK,
    GET_ALL_WORK_QUERY
}