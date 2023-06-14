import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })
    
    const token = createJWT(user)
    res.json({
        token,
        username: user.username,
        role: user.role
     })
}

export const userSignIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { 
            username: req.body.username
        }
    })

    const isValid = await comparePassword(req.body.password, user.password)

    if (!isValid) {
        res.status(401)
        res.json({ error: 'Invalid password' })
    }

    const token = createJWT(user)
    res.json({
        token,
        username: user.username,
        role: user.role
     })
}

export const completeOrder =async (req, res) => {
    const order = await prisma.order.update({
        where: {
            id_deliveredToId: {
                id: req.params.id,
                deliveredToId: req.user.id
            }
        },
        data: {
            status: 'COMPLETED'
        }
    })

    const riderId = order.deliveredById

    const rider = await prisma.rider.update({
        where: {
            id: riderId
        },
        data: {
            status: 'AVAILABLE'
        }
    })

    res.json({data: order})
}

export const completeCare =async (req, res) => {
    const care = await prisma.care.update({
        where: {
            id_deliveredToId: {
                id: req.params.id,
                deliveredToId: req.user.id
            }
        },
        data: {
            status: 'COMPLETED'
        }
    })

    const caregiverId = care.deliveredById

    const caregiver
     = await prisma.caregiver.update({
        where: {
            id: caregiverId
        },
        data: {
            status: 'AVAILABLE'
        }
    })

    res.json({data: care})
}