const express = require('express')
const router = express.Router()
const Foodsharer = require('../models/foodsharers')

// Getting all the foodsharers
router.get('/', async (request, response) => {
    try {
        const foodsharers = await Foodsharer.find()
        response.json(foodsharers)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
})

// Getting one foodsharer
router.get('/:id', getFoodsharer, (request, response) => {
    response.json(response.foodsharer) 
})

// Creating one foodsharer
router.post('/', async (request, response) => {
    const foodsharer = new Foodsharer({
       foodsharerName: request.body.foodsharerName,
       password: request.body.password,
       phoneNumber: request.body.phoneNumber,
       communityName: request.body.communityName,
       registeredDate: request.body.registeredDate
    })
    try {
        console.log('trying to save to DB...')
        const newFoodsharer = await foodsharer.save()
        response.status(201).json(newFoodsharer)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
})

// Updating one foodsharer
router.patch('/:id', getFoodsharer, async (request, response) => {
    if (request.body.foodsharerName != null) {
        response.foodsharer.foodsharerName = request.body.foodsharerName
    }
    
    if (request.body.password != null) {
        response.foodsharer.password = request.body.password
    }

    if (request.body.phoneNumber != null) {
        response.foodsharer.phoneNumber = request.body.phoneNumber
    }
    
    if (request.body.communityName =! null) {
        response.foodsharer.communityName =request.body.communityName
    }

    try {
        const updatedFoodsharer = await response.foodsharer.save()
        response.json(updatedFoodsharer)
    } catch (error) {
        response.status(400).json({message: error.message})
    }
})

// Deleting one foodsharer
router.delete('/:id', getFoodsharer, async (request, response) => {
    try {
        await response.foodsharer.remove()
        response.json({message: 'Deleted Foodsharer'})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

async function getFoodsharer(request, response, next) {
    let foodsharer
    try {
        foodsharer = await Foodsharer.findById(request.params.id)
        if (foodsharer == null) {
            return response.status(404).json({message: 'cannot find foodsharer'})
        }
    } catch (error) {
        return response.status(500).json({ message: error.message})
    }
    response.foodsharer = foodsharer
    next()
}

module.exports = router