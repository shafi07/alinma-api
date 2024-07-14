const CREATE_NEW_CUSTOMER = `INSERT INTO user_credentials (name, mobileNumber, id_number, qiwa, absheer, absheer_mobileNumber, dob, expiry_date,email,
    pwd, mudad, sijil, gosi, mudeer, mumeez_pwd, salama, post, baladi, tameeni, musanad, remarks) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)`

const GET_ALL_CUSTOMER = `SELECT id, fileId, name, mobileNumber, id_number, qiwa, absheer, absheer_mobileNumber, dob, expiry_date,email,
    pwd, mudad, sijil, gosi, mudeer, mumeez_pwd, salama, post, baladi, tameeni,musanad,createdTime,remarks
    FROM user_credentials ORDER BY createdTime DESC LIMIT 100`

const GET_ALL_CUSTOMER_QUERY = `SELECT id, fileId, name, mobileNumber, id_number, qiwa, absheer, absheer_mobileNumber, dob, expiry_date,email,
    pwd, mudad, sijil, gosi, mudeer, mumeez_pwd, salama, post, baladi, tameeni, musanad, createdTime,remarks
    FROM user_credentials WHERE name ILIKE '%' || $1 || '%' OR mobileNumber ILIKE '%' || $1 || '%' OR id_number ILIKE '%' || $1 || '%' LIMIT 100`

const UPDATE_CUSTOMER = `UPDATE user_credentials SET name = $2, mobileNumber = $3, id_number = $4, qiwa = $5 , absheer = $6, absheer_mobileNumber = $7, dob = $8, expiry_date = $9,email = $10,
    pwd = $11, mudad = $12, sijil = $13, gosi = $14, mudeer = $15, mumeez_pwd = $16, salama = $17, post = $18, baladi = $19, tameeni = $20 , musanad = $21, remarks = $22 WHERE id = $1`

const DELETE_CUSTOMER = `DELETE FROM user_credentials WHERE id = $1`


module.exports = {
    CREATE_NEW_CUSTOMER,
    GET_ALL_CUSTOMER,
    GET_ALL_CUSTOMER_QUERY,
    DELETE_CUSTOMER,
    UPDATE_CUSTOMER,
    }