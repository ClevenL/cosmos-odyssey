const { Router } = require('express')
const PriceList = require('../../models/PriceList')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const priceLists = await PriceList.find().sort({'validUntil': 'desc'})
        if (!priceLists) throw new Error('No priceLists')
        res.status(200).json(priceLists)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newPriceList = new PriceList(req.body)
    try {
        const priceList = await newPriceList.save()
        if (!priceList) throw new Error('PriceList POST / Error')
        res.status(200).json(priceList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await PriceList.findByIdAndDelete(id)
        if (!removed) throw Error(`PriceList DELETE /${id} Error`)
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/all', async (req, res) => {
    try {
        const removed = await PriceList.deleteMany({ __v: 0})
        if (!removed) throw Error('PriceList DELETE all Error')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router