const commonQuery = require('../models/commonQueryModel')
const customer = require('../queries/customerQueries')

module.exports = {
    async createCustomer(req, res) {
        try {
            await newCustomer(req.body)
            return res.status(200).json({
                message: "Customer created successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllCustomer(req, res) { 
        try {
            let allCustomer
            let { pageNo = 0, query } = req.query;
            offset = pageNo * 10
            if (query) {
                allCustomer = await commonQuery.exexuteQuery(customer.GET_ALL_CUSTOMER_QUERY, [query])
                return res.send(allCustomer.rows)
            }
            allCustomer = await commonQuery.exexuteQuery(customer.GET_ALL_CUSTOMER)
            return res.send(allCustomer.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async deleteCustomer(req, res) {
        try {
            const { id } = req.params;
            await commonQuery.exexuteQuery(customer.DELETE_CUSTOMER, [id]);
            return res.status(200).json({
                message: "Customer deleted successfully",
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async updateCustomer(req, res) {
        try {
            const { id,name, mobileNumber, id_number, qiwa, absheer, absheer_mobileNumber, dob, expiry_date,email,
                pwd, mudad, sijil, gosi, mudeer, mumeez_pwd, salama, post, baladi, tameeni,musanad,remarks} = req.body
            await commonQuery.exexuteQuery(customer.UPDATE_CUSTOMER, [id,name, mobileNumber, id_number, qiwa, absheer, absheer_mobileNumber, dob, expiry_date,email,
                pwd, mudad, sijil, gosi, mudeer, mumeez_pwd, salama, post, baladi, tameeni,musanad,remarks])
            return res.status(200).json({
                message: "Customer Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newCustomer(data) {
    try {
        const { name, mobileNumber, id_number, qiwa, absheer, absheer_mobileNumber, dob, expiry_date,email,
            pwd, mudad, sijil, gosi, mudeer, mumeez_pwd, salama, post, baladi, tameeni,musanad,remarks} = data
        await commonQuery.exexuteQuery(customer.CREATE_NEW_CUSTOMER, [name, mobileNumber, id_number, qiwa, absheer, absheer_mobileNumber, dob, expiry_date,email,
            pwd, mudad, sijil, gosi, mudeer, mumeez_pwd, salama, post, baladi, tameeni,musanad,remarks])
        return true
    } catch (error) {
        console.log(error)
    }
}