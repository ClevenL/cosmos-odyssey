const express = require('express')
const app = express()

const mongoose = require('mongoose')
const { PORT, mongoURI } = require('./config')
const cors = require('cors')

const priceListRoutes = require('./routes/api/priceLists')
const reservationRoutes = require('./routes/api/reservations')

const priceListHandler = require('./utils/priceListHandler')

app.use(cors())
app.use(express.json())

mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Failed to connect to database', err));

app.use('/api/priceLists', priceListRoutes)
app.use('/api/reservations', reservationRoutes)

priceListHandler.handle()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))