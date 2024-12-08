exports.GET_ALL_AGENT = `(
    SELECT COALESCE(agent_amount,0) agent_amount,agent,createdtime,to_char(createdTime,'DD/MM/YYYY') createdDate,paid_date,sub_category,fileId,'Javasath ' service FROM javasath WHERE COALESCE(agent, '') != ''
    UNION
    SELECT COALESCE(agent_amount,0) agent_amount,agent,createdtime,to_char(createdTime,'DD/MM/YYYY') createdDate,paid_date,sub_category,fileId,'Insurance' service FROM insurance WHERE COALESCE(agent, '') != ''
    UNION
    SELECT COALESCE(agent_amount,0) agent_amount,agent,createdtime,to_char(createdTime,'DD/MM/YYYY') createdDate,paid_date,sub_category,fileId,'Work' service FROM work WHERE COALESCE(agent, '') != '' 
	UNION
    SELECT COALESCE(agent_amount,0) agent_amount,agent,createdtime,to_char(createdTime,'DD/MM/YYYY') createdDate,paid_date,sub_category,fileId,'Visa' service FROM visa WHERE COALESCE(agent, '') != '' 
	UNION
    SELECT COALESCE(agent_amount,0) agent_amount,agent,createdtime,to_char(createdTime,'DD/MM/YYYY') createdDate,paid_date,sub_category,fileId,'Other' service FROM other WHERE COALESCE(agent, '') != '' 
)
ORDER BY createdtime DESC
LIMIT 1000`

// (
//     SELECT COALESCE(agent_amount,0) agent_amount,agent,createdtime,fileId,"test" service FROM javasath WHERE COALESCE(agent, '') != ''
//     UNION
//     SELECT COALESCE(agent_amount,0) agent_amount,agent,createdtime,fileId,"test"service FROM insurance WHERE COALESCE(agent, '') != ''
//     UNION
//     SELECT COALESCE(agent_amount,0) agent_amount,agent,createdtime,fileId,"tes" service FROM work WHERE COALESCE(agent, '') != '' 
// )
// ORDER BY createdtime DESC
// LIMIT 100;