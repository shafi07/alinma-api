const express = require("express");
const cors = require("cors");
const routes  = require("./src/routes");

const app = express()
const PORT = process.env.PORT || 8000

// commonQueryModel.exexuteQuery()
app.get('/',(req,res)=>{
    res.send('Welcome to alinma_Travels')
})

app.use(cors())
app.use(express.json());
app.use(routes)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});