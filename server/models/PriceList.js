const { Schema, model } = require('mongoose')

const PriceListSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    validUntil: {
        type: String,
        required: true,
    },
    legs: [Schema.Types.Mixed],
})

const PriceList = model('priceList', PriceListSchema)

module.exports = PriceList