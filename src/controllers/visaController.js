const commonQuery = require('../models/commonQueryModel')
const visa = require('../queries/visaQueries')
const moment = require('moment')

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
            if (status && status == 'credit') {
                if (status && !query) {
                    allVisa = await commonQuery.exexuteQuery(visa.GET_ALL_VISA_CREDIT)
                    return res.send(allVisa.rows)
                } else if (query && status) {
                    allVisa = await commonQuery.exexuteQuery(visa.GET_ALL_VISA_QUERY_CREDIT, [query])
                    return res.send(allVisa.rows)
                }
            }
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
            const { id, paid_amount,status,agent_amount,agent,paid_date,updatedTime} = req.body
            if(status){
                await commonQuery.exexuteQuery(visa.UPDATE_VISA_STATUS, [id, status,updatedTime])
                return res.status(200).json({
                    message: "Visa Status Updated successfully",
                }); 
            }
            if(agent_amount){
                await commonQuery.exexuteQuery(visa.UPDATE_VISA_AGENT_DETAILS, [id, agent, agent_amount, paid_date])
                return res.status(200).json({
                    message: "Visa Agent Details Updated successfully",
                });
            }
            let date = moment().format("DD-MM-YYYY")
            await commonQuery.exexuteQuery(visa.UPDATE_VISA, [id, paid_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
            return res.status(200).json({
                message: "Visa Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async patchVisa(req, res) {
        try {
            const { id, name, id_number, total_amount, mobilenumber, sub_category, sponser_name,
                service, remarks, visa_number, chamber_amount, government_fee,agent_amount,agent,paid_date,paid_amount,application_number,travels,status,payment_method } = req.body
            await Promise.all([commonQuery.exexuteQuery(visa.PATCH_VISA, [id, name, id_number, total_amount, mobilenumber, sub_category, sponser_name,
                service, remarks, visa_number, chamber_amount, government_fee,agent_amount,agent,paid_date,application_number,travels,status,payment_method])],updatePayment(id,paid_amount))
            return res.status(200).json({
                message: "Visa Data Updated successfully",
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
            paid_amount, mobilenumber, createdUser, updatedUser, sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,visa_number,chamber_amount,government_fee,application_number,travels } = data
        let date = moment().format("DD-MM-YYYY")
        await commonQuery.exexuteQuery(visa.CREATE_NEW_VISA, [name, id_number, total_amount,
            paid_amount, mobilenumber, createdUser, updatedUser, sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,visa_number,(`{"amount":"${paid_amount}","date":"${date}"}`),chamber_amount,government_fee,application_number,travels])
        return true
    } catch (error) {
        console.log(error)
    }
}

async function updatePayment (id,paid_amount) {
    try {
        let date = moment().format("DD-MM-YYYY")
        if (paid_amount != 0){
        return await commonQuery.exexuteQuery(visa.UPDATE_VISA, [id, paid_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
        }else{
            return true
        }     
    } catch (error) {
        return false
        console.log(error)
    }
}