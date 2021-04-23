const { Schema, model } = require('mongoose')

const PriceListSchema = new Schema({
    priceLists: [Schema.Types.Mixed],
})

const PriceList = model('priceList', PriceListSchema)

module.exports = PriceList