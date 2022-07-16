const express = require('express');
const bodyparser = require('body-parser').json()
const app = express()

app.use(bodyparser)
app.get('/', (req, res) => {
    res.send("Working")
})
const PORT = 3000;

app.listen(process.env.PORT || PORT)