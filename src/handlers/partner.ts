import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewPartner = async (req, res) => {
    const partner = await prisma.partner.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })

    const token = await createJWT(partner)

    res.json({token})
}

export const partnerSignIn = async (req, res) => {
    const partner = await prisma.partner.findUnique({
        where: {
            username: req.body.username,
        }
    })

    const isValid = await comparePassword(req.body.password, partner.password)

    if (!isValid) {
        res.status(401)
        res.json({ error: 'Invalid password'})
    }

    const token = createJWT(partner)

    res.json({token})
}

export const getPartners =async (req, res) => {
    const partner = await prisma.partner.findMany({
        select: {
            id: true,
            username: true
        }
    })

    res.json({ data: partner})
}