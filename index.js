const express = require('express');
const bodyparser = require('body-parser').json()


const { AuthRouter } = require('./api/v1/routes/Auth')
const { FollowRouter } = require('./api/v1/routes/FollowMosque')
const { MosqueRouter } = require('./api/v1/routes/Mosque');
const { AdminRouter } = require('./api/v1/routes/MosqueAdmin');
const { PostRouter } = require('./api/v1/routes/Post');
const { PrayerTimeRouter } = require('./api/v1/routes/PrayerTime');

const app = express()


app.use(bodyparser)
app.get('/', (req, res) => {
    res.send("Working")
})

app.use('/auth', AuthRouter)
app.use('/following', FollowRouter)
app.use('/mosque', MosqueRouter)
app.use('/admin', AdminRouter)
app.use('/post', PostRouter)
app.use('/prayer-time', PrayerTimeRouter)

const PORT = 4000;

app.listen(process.env.PORT || PORT)