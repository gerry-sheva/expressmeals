import prisma from "../db";
import { comparePassword } from "../modules/auth";
import { createJWT } from "../modules/auth";
import { hashPassword } from "../modules/auth";


export const createNewCaregiver =async (req, res) => {
    const caregiver = await prisma.caregiver.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })    

    const token = createJWT(caregiver)
    res.json({
        token,
        username: caregiver.username,
        role: caregiver.role
     })
}

export const caregiverSignIn =async (req, res) => {
    const caregiver = await prisma.caregiver.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePassword(req.body.password, caregiver.password)

    if (!isValid) {
        res.status(401)
        res.message({error: 'Invalid password'})
    }

    const token = createJWT(caregiver)
    res.json({
        token,
        username: caregiver.username,
        role: caregiver.role
     })
}

export const deliverCare =async (req, res) => {
    const care = await prisma.care.update({
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

    res.json({data: care})
}