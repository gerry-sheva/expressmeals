import prisma from "../db";

export const createCare =async (req, res) => {
    const caregivers = await prisma.caregiver.findMany({
        where: {
            status: 'AVAILABLE'
        },
        select: {
            id: true
        }
    })

    const random = Math.floor(Math.random() * caregivers.length);
    const {id} = caregivers[random];

    const care = await prisma.care.create({
        data: {
            deliveredById: id,
            deliveredToId: req.user.id
        }
    })

    const caregiver = await prisma.caregiver.update({
        where: {
            id: id
        },
        data: {
            status: 'UNAVAILABLE'
        }
    })

    res.json({data: care})
}