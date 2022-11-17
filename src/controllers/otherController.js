const commonQuery = require('../models/commonQueryModel')
const other = require('../queries/otherQueries')

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
            let { pageNo = 0, query } = req.query;
            offset = pageNo * 10
            if (query) {
                allOthers = await commonQuery.exexuteQuery(other.GET_ALL_OTHER_QUERY,[query])
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
            const { id, paid_amount } = req.body
            await commonQuery.exexuteQuery(other.UPDATE_OTHER, [id, paid_amount])
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
        const { name, id_number, total_amount,
            paid_amount, mobileNumber, createdUser, updatedUser, sub_category,sponser_name } = data
        await commonQuery.exexuteQuery(other.CREATE_NEW_OTHER, [name, id_number, total_amount,
            paid_amount, mobileNumber, createdUser, updatedUser, sub_category,sponser_name])
        return true
    } catch (error) {
        console.log(error)
    }
}