import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { getPartners } from './handlers/partner'
import { createNewMeal, getMeal, getMeals } from './handlers/meal'
import { createOrder } from './handlers/order'
import { completeCare, completeOrder } from './handlers/user'
import { deliveringStatus, getRiders } from './handlers/rider'
import { createCare } from './handlers/care'
import { deliverCare } from './handlers/caregiver'

const router = Router()

// Meal
router.get('/meal', getMeals)
router.get('/meal/:id', getMeal)
router.post('/meal', createNewMeal)
router.put('/meal/:id', (req, res) => {})
router.delete('/meal/:id', (req, res) => {})

// User
// router.put('/user/:id', body('username').exists().isString(), handleInputErrors, (req, res) => {})
router.put('/user/order/:id', completeOrder)
router.put('/user/care/:id', completeCare)

// Partner
router.get('/partner', getPartners)
// router.put('/partner/:id', body('username').exists().isString(), handleInputErrors, (req, res) => {})

// Caregiver
// router.put('/caregiver/:id', body('username').exists().isString(), handleInputErrors, (req, res) => {})
router.put('/caregiver/care/:id', deliverCare)

// Rider
// router.put('/rider/:id', body('username').exists().isString(), handleInputErrors, (req, res) => {})
router.put('/rider/order/:id', deliveringStatus)
router.get('/rider', getRiders)


// Order
router.get('/order', (req, res) => {
    res.json({ order: "Order",
            })
})
router.get('/order/:id', (req, res) => {})
router.post('/order', createOrder)
router.put('/order/:id', (req, res) => {})

// Care
router.post('/care', createCare)

export default router;