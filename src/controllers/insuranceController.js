const commonQuery = require('../models/commonQueryModel')
const insurance = require('../queries/insuranceQueries')

module.exports = {
    async createInsurance(req, res) {
        try {
            await newInsurance(req.body)
            return res.status(200).json({
                message: "Insurance created successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllInsurance(req, res) {
        try {
            let allInsurance
            let { pageNo = 0, query, status } = req.query;
            offset = pageNo * 10
            if (query && !status) {
                allInsurance = await commonQuery.exexuteQuery(insurance.GET_ALL_INSURANCE_QUERY, [query])
                return res.send(allInsurance.rows)
            } else if (status && !query) {
                allInsurance = await commonQuery.exexuteQuery(insurance.GET_ALL_INSURANCE_STATUS,[status])
                return res.send(allInsurance.rows)
            } else if (query && status) {
                allInsurance = await commonQuery.exexuteQuery(insurance.GET_ALL_INSURANCE_QUERY_STATUS,[query,status])
                return res.send(allInsurance.rows)
            }
            allInsurance = await commonQuery.exexuteQuery(insurance.GET_ALL_INSURANCE)
            return res.send(allInsurance.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async deleteInsurance(req, res) {
        try {
            const { id } = req.params;
            await commonQuery.exexuteQuery(insurance.DELETE_INSURANCE, [id]);
            return res.status(200).json({
                message: "Insurance deleted successfully",
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async updateInsurance(req, res) {
        try {
            const { id, paid_amount, status } = req.body
            if (status) {
                await commonQuery.exexuteQuery(insurance.UPDATE_INSURANCE_STATUS, [id, status])
                return res.status(200).json({
                    message: "Insurance Status Updated successfully",
                });
            }
            await commonQuery.exexuteQuery(insurance.UPDATE_INSURANCE, [id, paid_amount])
            return res.status(200).json({
                message: "Insurance Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newInsurance(data) {
    try {
        const { name, id_number, dob, total_amount,
            paid_amount, agent, mobileNumber, createdUser, updatedUser, sub_category,sponser_name } = data
        await commonQuery.exexuteQuery(insurance.CREATE_NEW_INSURANCE, [name, id_number, dob, total_amount,
            paid_amount, agent, mobileNumber, createdUser, updatedUser, sub_category,sponser_name])
        return true
    } catch (error) {
        console.log(error)
    }
}