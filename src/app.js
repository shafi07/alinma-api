const express = require("express");
const commonQueryModel = require('./models/commonQueryModel');
const routes  = require("./routes");

const app = express()
const PORT = 8000

// commonQueryModel.exexuteQuery()

app.use(routes)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`); 
});