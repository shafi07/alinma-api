const commonQuery = require('../models/commonQueryModel')
const javsath = require('../queries/javasthQueries')
const moment = require('moment')

module.exports = {
    async createJavasth(req, res) {
        try {
            await newJavasath(req.body)
            return res.status(200).json({
                message: "javasath created successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllJavasath(req, res) {
        try {
            let allJavasath
            let { pageNo = 0, query, status } = req.query;
            offset = pageNo * 10
            if (status && status == 'credit') {
                if (status && !query) {
                    allJavasath = await commonQuery.exexuteQuery(javsath.GET_ALL_JAVASATH_CREDIT)
                    return res.send(allJavasath.rows)
                } else if (query && status) {
                    allJavasath = await commonQuery.exexuteQuery(javsath.GET_ALL_JAVASATH_QUERY_CREDIT, [query])
                    return res.send(allJavasath.rows)
                }
            }
            if (query && !status) {
                allJavasath = await commonQuery.exexuteQuery(javsath.GET_ALL_JAVASATH_QUERY, [query])
                return res.send(allJavasath.rows)
            } else if (status && !query) {
                allJavasath = await commonQuery.exexuteQuery(javsath.GET_ALL_JAVASATH_STATUS,[status])
                return res.send(allJavasath.rows)
            } else if (query && status) {
                allJavasath = await commonQuery.exexuteQuery(javsath.GET_ALL_JAVASATH_STATUS_QUERY,[query,status])
                return res.send(allJavasath.rows)
            }
            allJavasath = await commonQuery.exexuteQuery(javsath.GET_ALL_JAVASATH)
            return res.send(allJavasath.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async deleteJavasath (req,res) {
        try {
            const {id} = req.params;
            await commonQuery.exexuteQuery(javsath.DELETE_JAVASATH,[id]);
            return res.status(200).json({
                message: "javasath deleted successfully",
            });
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" }); 
        }
    },

    async updateJavasath(req, res) {
        try {
            const { id, paid_amount,status,agent_amount,agent,paid_date} = req.body
            if (status) {
                await commonQuery.exexuteQuery(javsath.UPDATE_JAVASATH_STATUS, [id, status])
                return res.status(200).json({
                    message: "Javasath Status Updated successfully",
                });
            }
            if(agent_amount){
                await commonQuery.exexuteQuery(javsath.UPDATE_JAVASATH_AGENT_DETAILS, [id, agent, agent_amount, paid_date])
                return res.status(200).json({
                    message: "Javasath Agent Details Updated successfully",
                });
            }
            let date = moment().format("DD-MM-YYYY") 
            await commonQuery.exexuteQuery(javsath.UPDATE_JAVASATH, [id, paid_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
            return res.status(200).json({
                message: "javasath Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async patchJavasath(req, res) {
        try {
            const { id, agent_amount, agent, paid_date, sponser_name, name, id_number, purpose, iqama, insurance,
                other, total_amount, paid_amount, service, mobileNumber, mol, sub_category, remarks, professionName, newSponser } = req.body
            commonQuery.exexuteQuery(javsath.PATCH_JAVASATH, [id, agent, agent_amount, paid_date, sponser_name, name, id_number, purpose, iqama, insurance,
                other, total_amount, paid_amount, service, mobileNumber, mol, sub_category, remarks, professionName, newSponser])
            return res.status(200).json({
                message: "Javasath Data Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newJavasath(data) { 
    try {
        const { sponser_name, name, id_number, purpose, iqama, insurance, other, total_amount,
            paid_amount, service, mobileNumber, createdUser, updatedUser, mol, sub_category, remarks, agent, agent_amount, paid_date, professionName, newSponser } = data
        let date = moment().format("DD-MM-YYYY")
        let javasath = await commonQuery.exexuteQuery(javsath.CREATE_NEW_JAVASATH, [sponser_name, name, id_number, purpose, iqama, insurance, other, total_amount,
            paid_amount, service, mobileNumber, createdUser, updatedUser, mol, sub_category, remarks, (`{"amount":"${paid_amount}","date":"${date}"}`), agent, agent_amount, paid_date, professionName, newSponser ])
        return true
    } catch (error) {
        console.log(error)
        throw error
    }
}