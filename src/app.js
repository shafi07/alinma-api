const express = require("express");
const cors = require("cors");
const routes  = require("./routes");

const app = express()
const PORT = process.env.PORT || 8000

// commonQueryModel.exexuteQuery()
app.use(cors())
app.use(express.json());
app.use(routes)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});