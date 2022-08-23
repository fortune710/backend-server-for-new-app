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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyparser)

app.get('/', (req, res) => res.send("working"))

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

app.post('/get-timings', (req, res) => {
    const { longitude, latitude } = req.body;

    axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=cv3tKFSbAtAezYKXxkmbGijh4GqiDl03`)
    .then((data) => {
        const { address } = data.data.addresses[0];

        axios.get('http://api.aladhan.com/v1/timingsByCity', {
            params: {
                city: address.municipality,
                country: address.country,
                method: 8
            }
        })
        .then((response) => {
            const { timings } = response.data.data;
            let prayers = JSON.parse(timings);

            const apiResponse = {
                state_name: address.countrySubdivision,
                prayer_times: {
                    fajr: prayers.fajr,
                    dhuhr: prayers.dhuhr,
                    asr: prayers.asr,
                    maghrib: prayers.maghrib,
                    isha: prayers.isha,
                    jumaat: !prayers.jumaat ? 'N/A' : prayers.jumaat
                }
            }

            return res.json({ response: apiResponse })
        })
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