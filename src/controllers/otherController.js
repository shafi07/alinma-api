const commonQuery = require('../models/commonQueryModel')
const other = require('../queries/otherQueries')
const moment = require('moment')

module.exports = {
    async createOther(req, res) {
        try {
            await newOther(req.body)
            return res.status(200).json({
                message: "Other service created successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllOthers(req, res) {
        try {
            let allOthers
            let { pageNo = 0, query, status } = req.query;
            offset = pageNo * 10
            if (status && status == 'credit') {
                if (status && !query) {
                    allOthers = await commonQuery.exexuteQuery(other.GET_ALL_OTHER_CREDIT)
                return res.send(allOthers.rows)
                } else if (query && status) {
                    allOthers = await commonQuery.exexuteQuery(other.GET_ALL_OTHER_CREDIT_QUERY, [query])
                    return res.send(allOthers.rows)
                }
            }
            if (query && !status) {
                allOthers = await commonQuery.exexuteQuery(other.GET_ALL_OTHER_QUERY, [query])
                return res.send(allOthers.rows)
            } else if (status && !query) {
                allOthers = await commonQuery.exexuteQuery(other.GET_ALL_OTHER_STATUS, [status])
                return res.send(allOthers.rows)
            } else if (query && status) {
                allOthers = await commonQuery.exexuteQuery(other.GET_ALL_OTHER_QUERY_STATUS, [query, status])
                return res.send(allOthers.rows)
            }
            allOthers = await commonQuery.exexuteQuery(other.GET_ALL_OTHER)
            return res.send(allOthers.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async deleteOther(req, res) {
        try {
            const { id } = req.params;
            await commonQuery.exexuteQuery(other.DELETE_OTHER, [id]);
            return res.status(200).json({
                message: "Other deleted successfully",
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async updateOther(req, res) {
        try {
            const { id, paid_amount,status,agent_amount,agent,paid_date } = req.body
            if(status){
                await commonQuery.exexuteQuery(other.UPDATE_OTHER_STATUS, [id, status])
                return res.status(200).json({
                    message: "Other Service Status Updated successfully",
                }); 
            }
            if(agent_amount){
                await commonQuery.exexuteQuery(other.UPDATE_OTHER_AGENT_DETAILS, [id, agent, agent_amount, paid_date])
                return res.status(200).json({
                    message: "Other Agent Details Updated successfully",
                });
            }
            let date = moment().format("DD-MM-YYYY")
            await commonQuery.exexuteQuery(other.UPDATE_OTHER, [id, paid_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
            return res.status(200).json({
                message: "Other Service Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newOther(data) {
    try {
        const { name, id_number, total_amount,paid_amount, mobileNumber, createdUser, updatedUser, 
            sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks } = data
        let date = moment().format("DD-MM-YYYY")
        await commonQuery.exexuteQuery(other.CREATE_NEW_OTHER, [name, id_number, total_amount,
            paid_amount, mobileNumber, createdUser, updatedUser, sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,(`{"amount":"${paid_amount}","date":"${date}"}`)])
        return true
    } catch (error) {
        console.log(error)
    }
}