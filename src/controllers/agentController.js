const commonQuery = require('../models/commonQueryModel')
const agent = require('../queries/agentQueries')
const moment = require('moment')

module.exports = {

    async getAllAgents(req, res) {
        try {
            let allAgents
            let { pageNo = 0, query, status } = req.query;
            offset = pageNo * 10
            // if (status && status == 'credit') {
            //     if (status && !query) {
            //         allAgents = await commonQuery.exexuteQuery(agent.GET_ALL_AGENT_CREDIT)
            //         return res.send(allAgents.rows)
            //     } else if (query && status) {
            //         allAgents = await commonQuery.exexuteQuery(agent.GET_ALL_AGENT_QUERY_CREDIT, [query])
            //         return res.send(allAgents.rows)
            //     }
            // }
            // if (query && !status) {
            //     allAgents = await commonQuery.exexuteQuery(agent.GET_ALL_AGENT_QUERY, [query])
            //     return res.send(allAgents.rows)
            // } else if (status && !query) {
            //     allAgents = await commonQuery.exexuteQuery(agent.GET_ALL_AGENT_STATUS, [status])
            //     return res.send(allAgents.rows)
            // } else if (query && status) {
            //     allAgents = await commonQuery.exexuteQuery(agent.GET_ALL_AGENT_STATUS_QUERY, [query, status])
            //     return res.send(allAgents.rows)
            // }
            allAgents = await commonQuery.exexuteQuery(agent.GET_ALL_AGENT)
            return res.send(allAgents.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internel server error" });
        }
    }

}