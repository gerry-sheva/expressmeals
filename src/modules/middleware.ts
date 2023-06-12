import { validationResult } from 'express-validator'

export const handleInputErrors = (req, res, next) => {
    const error = validationResult(req)
    console.error(error)

    if (!error.isEmpty()) {
        res.status(400)
        res.json({ error: error.array() })
    } else {
        next()
    }
}