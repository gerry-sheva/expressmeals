import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";


export const createNewRider =async (req, res) => {
    const rider = await prisma.rider.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })

    const token = await createJWT(rider)

    res.json({token})
}

export const riderSignIn =async (req, res) => {
    const rider = await prisma.rider.findUnique({
        where: {username: req.body.username}
    })

    const isValid = await comparePassword(req.body.password, rider.password)

    if (!isValid) {
        res.status(401)
        res.json({error: 'Invalid password'})
    }

    const token = createJWT(rider)

    res.json({ token })
}

export const deliveringStatus =async (req, res) => {
    const order = await prisma.order.update({
        where: {
            id_deliveredById: {
                id: req.params.id,
                deliveredById: req.user.id
            }
        },
        data: {
            status: 'DELIVERING'
        }
    })

    res.json({data: order})
}

export const getRiders =async (req, res) => {
    const riders = await prisma.rider.findMany({
        select: {
            id: true
        }
    })

    const random = Math.floor(Math.random() * riders.length);
    const {id} = riders[random];


    res.json({data:id})
}