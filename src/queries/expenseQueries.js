const CREATE_NEW_EXPENSE = `INSERT INTO expense (electricity,telephone,salary,stationary,other,createdUser, updatedUser,remarks,total_amount) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`

const GET_ALL_EXPENSE = `SELECT DISTINCT ON(createdTime) id,total_amount,fileId,electricity,telephone,salary,stationary,other,remarks,createdTime 
    FROM expense ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_EXPENSE_QUERY = `SELECT DISTINCT ON(createdTime) id,total_amount,fileId,electricity,telephone,salary,stationary,other,remarks,createdTime
    FROM expense WHERE createdTime ILIKE '%' || $1 || '%'  LIMIT 100`

// const GET_ALL_VISA_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,visa_number,
//     total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
//     FROM visa WHERE status = $1 LIMIT 100`

// const GET_ALL_VISA_QUERY_STATUS = `SELECT DISTINCT ON(fileId,name) id,name,id_number,sponser_name,visa_number,
//     total_amount,paid_amount,mobileNumber,sub_category,balance_amount,fileId,status,agent,agent_amount,paid_date,service,remarks
//     FROM visa WHERE (fileId ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%') AND status = $2  LIMIT 100`

const UPDATE_EXPENSE = `UPDATE expense SET electricity=$2,telephone=$3,salary=$4,stationary=$5,other=$6,createdUser=$7, remarks=$8 WHERE id = $1`


const DELETE_EXPENSE = `DELETE FROM expense WHERE id = $1` 
 
module.exports = {
    CREATE_NEW_EXPENSE,
    GET_ALL_EXPENSE,
    DELETE_EXPENSE,
    UPDATE_EXPENSE,
    GET_ALL_EXPENSE_QUERY,
}