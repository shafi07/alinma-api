const commonQuery = require('../models/commonQueryModel')
const work = require('../queries/workQueries')

module.exports = {
    async createWork(req, res) {
        try {
            await newWork(req.body)
            return res.status(200).json({
                message: "work created successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllWork(req, res) {
        try {
            let allWork
            let { pageNo = 0, query } = req.query;
            offset = pageNo * 10
            if (query) {
                allWork = await commonQuery.exexuteQuery(work.GET_ALL_WORK_QUERY,[query])
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
            const { id, paid_amount } = req.body
            await commonQuery.exexuteQuery(work.UPDATE_WORK, [id, paid_amount])
            return res.status(200).json({
                message: "Work Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newWork(data) {
    try {
        const { name, id_number, total_amount,
            paid_amount, agent, mobileNumber, createdUser, updatedUser, sub_category, sponser_name } = data
        await commonQuery.exexuteQuery(work.CREATE_NEW_WORK, [name, id_number, total_amount,
            paid_amount, agent, mobileNumber, createdUser, updatedUser, sub_category, sponser_name])
        return true
    } catch (error) {
        console.log(error)
    }
}