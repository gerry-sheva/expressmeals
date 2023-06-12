import prisma from "../db";

export const createOrder =async (req, res) => {
    const riders = await prisma.rider.findMany({
        where: {
            status: 'AVAILABLE'
        },
        select: {
            id: true
        }
    })

    const random = Math.floor(Math.random() * riders.length);
    const {id} = riders[random];

    const order = await prisma.order.create({
        data: {
            menuId: req.body.menuId,
            deliveredById: id,
            deliveredToId: req.user.id
        }
    })

    const rider = await prisma.rider.update({
        where: {
            id: id
        },
        data: {
            status: 'UNAVAILABLE'
        }
    })

    res.json({data: order})
}