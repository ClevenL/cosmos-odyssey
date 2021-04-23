const { Router } = require('express')
const Reservation = require('../../models/Reservation')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({'created': 'desc'})
        if (!reservations) throw new Error('No reservations')
        res.status(200).json(reservations)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newReservation = new Reservation(req.body)
    try {
        const reservation = await newReservation.save()
        if (!reservation) throw new Error('Reservation POST / Error')
        res.status(200).json(reservation)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Reservation.findByIdAndUpdate(id, req.body)
        if (!response) throw Error(`Reservation PUT /${id} Error`)
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Reservation.findByIdAndDelete(id)
        if (!removed) throw Error(`Reservation DELETE /${id} Error`)
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/all', async (req, res) => {
    try {
        const removed = await Reservation.deleteMany({ __v: 0})
        if (!removed) throw Error('Reservation DELETE all Error')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router