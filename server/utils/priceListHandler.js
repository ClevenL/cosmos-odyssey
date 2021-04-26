const axios = require('axios')
const PriceList = require('../models/PriceList')
const Reservation = require('../models/Reservation')

async function fetchPriceListFromAPI() {
    const response = await axios.get(`https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices`)
    return response.data
}

// Get the latest pricelist from the database or all stored pricelists
async function getPriceListsFromDB(latest = true) {
    const priceLists = await PriceList.find().sort({'validUntil': 'desc'})
    if (!priceLists) return false
    return latest ? priceLists[0] : priceLists
}
async function getReservationsFromDB() {
    const reservations = await Reservation.find()
    if (!reservations) return false
    return reservations
}

// If there's over 15 pricelists, delete one
async function cleanDB() {
    const priceLists = await getPriceListsFromDB(false)
    if (priceLists.length > 15) {
        const lastPriceList = priceLists[priceLists.length - 1]
        const reservations = await getReservationsFromDB()
        // If there are reservations using the soon to be deleted pricelist, delete them
        if (reservations) reservations.forEach(async reservation => {
            if (reservation.priceListId == lastPriceList._id) {
                try {
                    const removed = await Reservation.findByIdAndDelete(reservation._id)
                    if (!removed) throw Error(`Reservation deleting:${reservation._id} Error`)
                } catch (error) {
                    console.log(error)
                }
            } 
        })
        try {
            const removed = await PriceList.findByIdAndDelete(lastPriceList._id)
            if (!removed) throw Error(`PriceList deleting:${id} Error`)
        } catch (error) {
            console.log(error)
        }
    }
}

// Save a new pricelist
async function saveNewPriceList() {
    const newPriceList = new PriceList(await fetchPriceListFromAPI())
    try {
        const priceList = await newPriceList.save()
        if (!priceList) throw new Error('PriceList save Error')
    } catch (error) {
        console.log(error)
    }
    await cleanDB()
}

// Main loop for checking pricelists
exports.handle = async () => {
    let latestPriceList = await getPriceListsFromDB()
    // If theres no pricelists in the database, save a new pricelist
    if (!latestPriceList) {
        await saveNewPriceList()
        latestPriceList = await getPriceListsFromDB()
    }
    if (latestPriceList) {
        const fetchedPriceList = await fetchPriceListFromAPI()
        // If the latest pricelist in the database is outdated then save a new pricelist and call the function again
        // Otherwise set timeout for the function until pricelist is valid and call the function again
        if (new Date(latestPriceList.validUntil).valueOf() < new Date(fetchedPriceList.validUntil).valueOf()) {
            await saveNewPriceList()
            this.handle()
        } else {
            const validTime = new Date(fetchedPriceList.validUntil).valueOf() - Date.now()
            setTimeout(async () => {
                await saveNewPriceList()
                this.handle()
            }, validTime)
        }
    }
}