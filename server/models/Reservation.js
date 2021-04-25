const { Schema, model } = require('mongoose')

const ReservationSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    routes: [Schema.Types.Mixed],
    totalPrice: Number,
    totalTravelTime: Number,
    priceListId: String,
    created: {
        type: Date,
        default: Date.now,
    },
})

const Reservation = model('reservation', ReservationSchema)

module.exports = Reservation