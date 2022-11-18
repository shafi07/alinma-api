const commonQuery = require('../models/commonQueryModel')
const expense = require('../queries/expenseQueries')

module.exports = {
    async createExpense(req, res) {
        try {
            await newExpense(req.body)
            return res.status(200).json({
                message: "Expense created successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async getAllExpense(req, res) {
        try {
            let allExpense
            let { pageNo = 0, query } = req.query;
            offset = pageNo * 10
            if (query) {
                allExpense = await commonQuery.exexuteQuery(expense.GET_ALL_EXPENSE_QUERY, [query])
                return res.send(allExpense.rows)
            }
            allExpense = await commonQuery.exexuteQuery(expense.GET_ALL_EXPENSE)
            return res.send(allExpense.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async deleteExpense(req, res) {
        try {
            const { id } = req.params;
            await commonQuery.exexuteQuery(expense.DELETE_EXPENSE, [id]);
            return res.status(200).json({
                message: "Expense deleted successfully",
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    },

    async updateExpense(req, res) {
        try {
            const { id,electricity,telephone,salary,stationary,other,createdUser,remarks} = req.body
            await commonQuery.exexuteQuery(expense.UPDATE_EXPENSE, [id,electricity,telephone,salary,stationary,other,createdUser,remarks])
            return res.status(200).json({
                message: "Expense Updated successfully",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }
}

async function newExpense(data) {
    try {
        const { electricity,telephone,salary,stationary,other,createdUser, updatedUser,remarks} = data
        await commonQuery.exexuteQuery(expense.CREATE_NEW_EXPENSE, [electricity,telephone,salary,stationary,other,createdUser, updatedUser,remarks])
        return true
    } catch (error) {
        console.log(error)
    }
}