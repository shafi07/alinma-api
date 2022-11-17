const commonQuery = require('../models/commonQueryModel')
const visa = require('../queries/visaQueries')

module.exports = {
    async createVisa(req, res) {
        try {
            await newVisa(req.body)
            return res.status(200).json({
                message: "Visa created successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllVisa(req, res) {
        try {
            let allVisa
            let { pageNo = 0, query, status } = req.query;
            offset = pageNo * 10
            if (query && !status) {
                allVisa = await commonQuery.exexuteQuery(visa.GET_ALL_VISA_QUERY, [query])
                return res.send(allVisa.rows)
            } else if (status && !query) {
                allVisa = await commonQuery.exexuteQuery(visa.GET_ALL_VISA_STATUS, [status])
                return res.send(allVisa.rows)
            } else if (query && status) {
                allVisa = await commonQuery.exexuteQuery(visa.GET_ALL_VISA_QUERY_STATUS, [query, status])
                return res.send(allVisa.rows)
            }
            allVisa = await commonQuery.exexuteQuery(visa.GET_ALL_VISA)
            return res.send(allVisa.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async deleteVisa(req, res) {
        try {
            const { id } = req.params;
            await commonQuery.exexuteQuery(visa.DELETE_VISA, [id]);
            return res.status(200).json({
                message: "Visa deleted successfully",
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async updateVisa(req, res) {
        try {
            const { id, paid_amount,status } = req.body
            if(status){
                await commonQuery.exexuteQuery(visa.UPDATE_VISA_STATUS, [id, status])
                return res.status(200).json({
                    message: "Visa Status Updated successfully",
                }); 
            }
            await commonQuery.exexuteQuery(visa.UPDATE_VISA, [id, paid_amount])
            return res.status(200).json({
                message: "Visa Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newVisa(data) {
    try {
        const { name, id_number, total_amount,
            paid_amount, mobileNumber, createdUser, updatedUser, sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,visa_number } = data
        await commonQuery.exexuteQuery(visa.CREATE_NEW_VISA, [name, id_number, total_amount,
            paid_amount, mobileNumber, createdUser, updatedUser, sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,visa_number])
        return true
    } catch (error) {
        console.log(error)
    }
}