const express = require('express');
const bodyparser = require('body-parser').json()
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');

const { AuthRouter } = require('./api/v1/routes/Auth')
const { FollowRouter } = require('./api/v1/routes/FollowMosque')
const { MosqueRouter } = require('./api/v1/routes/Mosque');
const { AdminRouter } = require('./api/v1/routes/MosqueAdmin');
const { PostRouter } = require('./api/v1/routes/Post');
const { PrayerTimeRouter } = require('./api/v1/routes/PrayerTime');
const { MosqueBookRouter } = require('./api/v1/routes/MosqueBooks');

const { convertISOToTime } = require('./helpers/isototime')

const app = express();

app.use(cors({
    origin: ["https://fortune710.github.io","http://localhost:3000", "io.iqama", "capacitor://localhost", "http://localhost" ,"*"],
    credentials: true
}))

/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    next();
});
*/

app.use(bodyparser)

app.get('/', (req, res) => res.send("working"))

app.post('/state-timings', (req, res) => {
    const { country, city, state } = req.body;
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: {
            city: city,
            country: country,
            method: 3
        }
    })
    .then((response) => {
        const { Fajr, Asr, Maghrib, Dhuhr, Isha } = response.data.data.timings;
        
        const date = moment(new Date().toISOString()).format("HH:mm")
        const compareTime = moment(date, "hh:mm")
        const prayers = [
            { name: 'Fajr', time:Fajr },
            { name: 'Dhuhr', time: Dhuhr },
            { name: 'Asr', time: Asr }, 
            { name: 'Maghrib', time: Maghrib },
            { name: 'Isha', time: Isha }  
        ]
        const closestTime = prayers.find((time) => {
            const diff = moment(time.time, "hh:mm").diff(compareTime, 'minutes')
            return diff >= 0
        })

        const apiResponse = {
            state_name: state,
            prayer_times: {
                fajr: Fajr,
                dhuhr: Dhuhr,
                asr: Asr,
                maghrib: Maghrib,
                isha: Isha
            },
            next_prayer: closestTime
        }

        if(!closestTime){
            apiResponse.next_prayer = {
                name: "Fajr",
                time: Fajr
            }
        }

        return res.json({ response: apiResponse })
    })
    .catch(err => {
        return res.json({ response: err })
    })


})

app.get('/get-hijri-date', (req, res) => {

    const todayDate = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`

    axios.get(`http://api.aladhan.com/v1/gToH?date=${todayDate}`)
    .then(({ data }) => {
        const { hijri } = data.data;
        res.json({ hijri_date: hijri.date })
    
    })
    .catch(() => {
        res.json({ response: 'Errror while getting date' })
    })
})


//app.use('/auth', AuthRouter)
app.use('/following', FollowRouter)
app.use('/mosque', MosqueRouter)
app.use('/admin', AdminRouter)
app.use('/post', PostRouter)
//app.use('/prayer-time', PrayerTimeRouter)
//app.use('/mosque-books', MosqueBookRouter)

const PORT = 4000;

app.listen(process.env.PORT || PORT)