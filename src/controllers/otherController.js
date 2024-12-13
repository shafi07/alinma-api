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
            let finalQuery = ``
            let { pageNo = 0, query, status, type } = req.query;
            offset = pageNo * 10
            if (status && status == 'credit') {
                if (status && !query) {
                    finalQuery = type == `passport` ? other.GET_ALL_OTHER_CREDIT_PASSPORT : other.GET_ALL_OTHER_CREDIT
                    allOthers = await commonQuery.exexuteQuery(finalQuery)
                return res.send(allOthers.rows)
                } else if (query && status) {
                    finalQuery = type == `passport` ? other.GET_ALL_OTHER_CREDIT_QUERY_PASSPORT : other.GET_ALL_OTHER_CREDIT_QUERY
                    allOthers = await commonQuery.exexuteQuery(finalQuery, [query])
                    return res.send(allOthers.rows)
                }
            }
            if (query && !status) {
                finalQuery = type == `passport` ? other.GET_ALL_OTHER_QUERY_PASSPORT : other.GET_ALL_OTHER_QUERY
                allOthers = await commonQuery.exexuteQuery(finalQuery, [query])
                return res.send(allOthers.rows)
            } else if (status && !query) {
                finalQuery = type == `passport` ? other.GET_ALL_OTHER_STATUS_PASSPORT : other.GET_ALL_OTHER_STATUS
                allOthers = await commonQuery.exexuteQuery(finalQuery, [status])
                return res.send(allOthers.rows)
            } else if (query && status) {
                finalQuery = type == `passport` ? other.GET_ALL_OTHER_QUERY_STATUS_PASSPORT : other.GET_ALL_OTHER_QUERY_STATUS
                allOthers = await commonQuery.exexuteQuery(finalQuery, [query, status])
                return res.send(allOthers.rows)
            }
            finalQuery = type == `passport` ? other.GET_ALL_OTHER_PASSPORT : other.GET_ALL_OTHER
            allOthers = await commonQuery.exexuteQuery(finalQuery)
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
            const { id, paid_amount,status,agent_amount,agent,paid_date,updatedTime } = req.body
            if(status){
                await commonQuery.exexuteQuery(other.UPDATE_OTHER_STATUS, [id, status,updatedTime])
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
    },

    async patchOther(req, res) {
        try { 
            const { id, agent_amount, agent, paid_date, name, id_number, total_amount, mobilenumber, sub_category,
                sponser_name, service, remarks,paid_amount,status } = req.body
            await Promise.all([commonQuery.exexuteQuery(other.PATCH_OTHER, [id, agent, agent_amount, paid_date, name, id_number, total_amount, mobilenumber, sub_category, sponser_name, service, remarks,status]),updatePayment(id,paid_amount)])
            return res.status(200).json({
                message: "Other Data Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newOther(data) {
    try {
        const { name, id_number, total_amount,paid_amount, mobilenumber, createdUser, updatedUser, 
            sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks } = data
        let date = moment().format("DD-MM-YYYY")
        await commonQuery.exexuteQuery(other.CREATE_NEW_OTHER, [name, id_number, total_amount,
            paid_amount, mobilenumber, createdUser, updatedUser, sub_category,sponser_name,agent,agent_amount,paid_date,service,remarks,(`{"amount":"${paid_amount}","date":"${date}"}`)])
        return true
    } catch (error) {
        console.log(error)
    }
}

async function updatePayment (id,paid_amount) {
    try {
        let date = moment().format("DD-MM-YYYY")
        if (paid_amount != 0){
        return await commonQuery.exexuteQuery(other.UPDATE_OTHER, [id, paid_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
        }else{
            return true
        }     
    } catch (error) {
        return false
        console.log(error)
    }
}