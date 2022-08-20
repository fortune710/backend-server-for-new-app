const express = require('express');
const bodyparser = require('body-parser').json()
const cors = require('cors');
const axios = require('axios');

const { AuthRouter } = require('./api/v1/routes/Auth')
const { FollowRouter } = require('./api/v1/routes/FollowMosque')
const { MosqueRouter } = require('./api/v1/routes/Mosque');
const { AdminRouter } = require('./api/v1/routes/MosqueAdmin');
const { PostRouter } = require('./api/v1/routes/Post');
const { PrayerTimeRouter } = require('./api/v1/routes/PrayerTime');
const { MosqueBookRouter } = require('./api/v1/routes/MosqueBooks');

const app = express();

app.use(cors({
    origin: '*',
    methods: "GET, PUT, POST"
}))

app.use(bodyparser)

app.get('/', (req, res) => {
    res.send("working")
    axios.get(`http://api.aladhan.com/v1/gToH?date=${todayDate}`, {
        headers: {
            mode: 'cors'
        }
    })
    .then(({ data }) => {
        const { hijri } = data.data;
        res.json({ hijri_date: hijri.date })
    
    })
    .catch(() => {
        res.json({ response: 'Errror while getting date' })
    })
})

app.use('/auth', AuthRouter)
app.use('/following', FollowRouter)
app.use('/mosque', MosqueRouter)
app.use('/admin', AdminRouter)
app.use('/post', PostRouter)
app.use('/prayer-time', PrayerTimeRouter)
app.use('/mosque-books', MosqueBookRouter)

const PORT = 4000;

app.listen(process.env.PORT || PORT)