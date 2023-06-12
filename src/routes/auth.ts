import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { createNewUser, userSignIn } from '../handlers/user'
import { createNewPartner, partnerSignIn } from '../handlers/partner'
import { caregiverSignIn, createNewCaregiver } from '../handlers/caregiver'
import { createNewRider, riderSignIn } from '../handlers/rider'

const authRouter = Router()

// Sign up
authRouter.post('/user', body('username').exists().isString(), body('password').exists().isString(), handleInputErrors, createNewUser)
authRouter.post('/partner', body('username').exists().isString(), body('password').exists().isString(), handleInputErrors, createNewPartner)
authRouter.post('/caregiver', body('username').exists().isString(), body('password').exists().isString(), handleInputErrors, createNewCaregiver)
authRouter.post('/rider', body('username').exists().isString(), body('password').exists().isString(), handleInputErrors, createNewRider)

// Sign in
authRouter.post('/signin-user', body('username').exists().isString(), body('password').exists().isString(), handleInputErrors, userSignIn)
authRouter.post('/signin-partner', body('username').exists().isString(), body('password').exists().isString(), handleInputErrors, partnerSignIn)
authRouter.post('/signin-caregiver', body('username').exists().isString(), body('password').exists().isString(), handleInputErrors, caregiverSignIn)
authRouter.post('/signin-rider', body('username').exists().isString(), body('password').exists().isString(), handleInputErrors, riderSignIn)

export default authRouter