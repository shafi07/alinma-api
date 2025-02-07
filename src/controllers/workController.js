const commonQuery = require('../models/commonQueryModel')
const work = require('../queries/workQueries')
const moment = require('moment')

module.exports = {
    async createWork(req, res) {
        try {
            const workNew = await newWork(req.body)
            if (workNew) {
                return res.status(200).json({
                    message: "work created successfully",
                });
            }
            else {
                return res.status(400).json({
                    message: "Error in Create work",
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllWork(req, res) {
        try {
            let allWork
            let { pageNo = 0, query, status } = req.query;
            offset = pageNo * 10
            if (status && status == 'credit') {
                if (status && !query) {
                    allWork = await commonQuery.exexuteQuery(work.GET_ALL_WORK_CREDIT)
                    return res.send(allWork.rows)
                } else if (query && status) {
                    allWork = await commonQuery.exexuteQuery(work.GET_ALL_WORK_CREDIT_QUERY, [query])
                    return res.send(allWork.rows)
                }
            }
            if (query && !status) {
                allWork = await commonQuery.exexuteQuery(work.GET_ALL_WORK_QUERY, [query])
                return res.send(allWork.rows)
            } else if (status && !query) {
                allWork = await commonQuery.exexuteQuery(work.GET_ALL_WORK_STATUS, [status])
                return res.send(allWork.rows)
            } else if (query && status) {
                allWork = await commonQuery.exexuteQuery(work.GET_ALL_WORK_QUERY_STATUS, [query, status])
                return res.send(allWork.rows)
            }
            allWork = await commonQuery.exexuteQuery(work.GET_ALL_WORK)
            return res.send(allWork.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async deleteWork(req, res) {
        try {
            const { id } = req.params;
            await commonQuery.exexuteQuery(work.DELETE_WORK, [id]);
            return res.status(200).json({
                message: "Work deleted successfully",
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async updateWork(req, res) {
        try {
            const { id, paid_amount, status, agent_amount, agent, paid_date, updatedTime } = req.body
            if (status) {
                await commonQuery.exexuteQuery(work.UPDATE_WORK_STATUS, [id, status, updatedTime])
                return res.status(200).json({
                    message: "Work Status Updated successfully",
                });
            }
            if (agent_amount) {
                await commonQuery.exexuteQuery(work.UPDATE_WORK_AGENT_DETAILS, [id, agent, agent_amount, paid_date])
                return res.status(200).json({
                    message: "Work Agent Details Updated successfully",
                });
            }
            let date = moment().format("DD-MM-YYYY")
            await commonQuery.exexuteQuery(work.UPDATE_WORK, [id, paid_amount, (`{"amount":"${paid_amount}","date":"${date}"}`)])
            return res.status(200).json({
                message: "Work Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async patchWork(req, res) {
        try {
            const { id, agent_amount, agent, paid_date, name, id_number,work_type,
                total_amount, mobilenumber, sub_category, sponser_name, service, remarks, government_fee,paid_amount,status,payment_method } = req.body
            await Promise.all([commonQuery.exexuteQuery(work.PATCH_WORK, [id, agent, agent_amount, paid_date, name, id_number, total_amount, mobilenumber, sub_category, sponser_name, service, remarks, government_fee,work_type,status,payment_method]),updatePayment(id,paid_amount)])
            return res.status(200).json({
                message: "Work Data Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newWork(data) {
    try {
        const { name, id_number, total_amount,work_type,
            paid_amount, agent, mobilenumber, createdUser, updatedUser, sub_category, sponser_name, agent_amount, service, paid_date, remarks, government_fee } = data
        let date = moment().format("DD-MM-YYYY")
        await commonQuery.exexuteQuery(work.CREATE_NEW_WORK, [name, id_number, total_amount,
            paid_amount, agent, mobilenumber, createdUser, updatedUser, sub_category, sponser_name, agent_amount, service, paid_date, remarks, (`{"amount":"${paid_amount}","date":"${date}"}`), government_fee,work_type])
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

async function updatePayment (id,paid_amount) {
    try {
        let date = moment().format("DD-MM-YYYY")
        if (paid_amount != 0){
        return await commonQuery.exexuteQuery(work.UPDATE_WORK, [id, paid_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
        }else{
            return true
        }     
    } catch (error) {
        return false
        console.log(error)
    }
}