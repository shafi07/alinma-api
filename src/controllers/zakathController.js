const commonQuery = require('../models/commonQueryModel')
const zakath = require('../queries/zakathQueries')
const moment = require('moment')

module.exports = {
    async createZakath(req, res) {
        try {
            await newZakath(req.body)
            return res.status(200).json({
                message: "Zakath created successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllZakath(req, res) {
        try {
            let allZakath
            let { pageNo = 0, query, status } = req.query;
            offset = pageNo * 10
            if (status && status == 'credit') {
                if (status && !query) {
                    allZakath = await commonQuery.exexuteQuery(zakath.GET_ALL_ZAKATH_CREDIT)
                    return res.send(allZakath.rows)
                } else if (query && status) {
                    allZakath = await commonQuery.exexuteQuery(zakath.GET_ALL_ZAKATH_QUERY_CREDIT, [query])
                    return res.send(allZakath.rows)
                }
            }
            if (query && !status) {
                allZakath = await commonQuery.exexuteQuery(zakath.GET_ALL_ZAKATH_QUERY, [query])
                return res.send(allZakath.rows)
            } else if (status && !query) {
                allZakath = await commonQuery.exexuteQuery(zakath.GET_ALL_ZAKATH_STATUS, [status])
                return res.send(allZakath.rows)
            } else if (query && status) {
                allZakath = await commonQuery.exexuteQuery(zakath.GET_ALL_ZAKATH_QUERY_STATUS, [query, status])
                return res.send(allZakath.rows)
            }
            allZakath = await commonQuery.exexuteQuery(zakath.GET_ALL_ZAKATH)
            return res.send(allZakath.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async deleteZakath(req, res) {
        try {
            const { id } = req.params;
            await commonQuery.exexuteQuery(zakath.DELETE_ZAKATH, [id]);
            return res.status(200).json({
                message: "Zakath deleted successfully",
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async updateZakath(req, res) {
        try {
            const { id, paid_amount,status,agent_amount,agent,paid_date,updatedTime} = req.body
            if(status){
                await commonQuery.exexuteQuery(zakath.UPDATE_ZAKATH_STATUS, [id, status,updatedTime])
                return res.status(200).json({
                    message: "Zakath Status Updated successfully",
                }); 
            }
            // if(agent_amount){
            //     await commonQuery.exexuteQuery(zakath.UPDATE_ZAKATH_AGENT_DETAILS, [id, agent, agent_amount, paid_date])
            //     return res.status(200).json({
            //         message: "Zakath Agent Details Updated successfully",
            //     });
            // }
            let date = moment().format("DD-MM-YYYY")
            await commonQuery.exexuteQuery(zakath.UPDATE_ZAKATH, [id, paid_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
            return res.status(200).json({
                message: "Zakath Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async patchZakath(req, res) {
        try {
            const { id, name, id_number, total_amount, mobilenumber, sub_category, sponser_name, payment_method,
                service, remarks, zareeba_date, purchase_amount, sales_amount,agent_amount,agent,paid_date,paid_amount,application_number,travels,status } = req.body
            await Promise.all([commonQuery.exexuteQuery(zakath.PATCH_ZAKATH, [id, name, id_number, total_amount, mobilenumber, sub_category, sponser_name,
                service, remarks, zareeba_date, purchase_amount, sales_amount, paid_date, status, payment_method])],updatePayment(id,paid_amount))
            return res.status(200).json({
                message: "Zakath Data Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newZakath(data) {
    try {
        const { name, id_number, total_amount,
            paid_amount, mobilenumber, createdUser, updatedUser, sub_category,sponser_name,zareeba_date,purchase_amount,paid_date,service,remarks,sales_amount,government_fee,application_number,travels } = data
        let date = moment().format("DD-MM-YYYY")
        await commonQuery.exexuteQuery(zakath.CREATE_NEW_ZAKATH, [name, id_number, total_amount,
            paid_amount, mobilenumber, createdUser, updatedUser, sub_category,sponser_name,zareeba_date,purchase_amount,paid_date,service,remarks,sales_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
        return true
    } catch (error) {
        console.log(error)
    }
}

async function updatePayment (id,paid_amount) {
    try {
        let date = moment().format("DD-MM-YYYY")
        if (paid_amount != 0){
        return await commonQuery.exexuteQuery(zakath.UPDATE_ZAKATH, [id, paid_amount,(`{"amount":"${paid_amount}","date":"${date}"}`)])
        }else{
            return true
        }     
    } catch (error) {
        return false
    }
}