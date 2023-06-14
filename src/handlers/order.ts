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

export const getUserOrders =async (req, res) => {
    const orders = await prisma.order.findMany({
        where: {
            deliveredToId: req.user.id
        },
        include: {
            menu: {
                select: {
                    name: true,
                    providedBy: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    })

    res.json({data: orders})
}
export const getRiderOrders =async (req, res) => {
    const orders = await prisma.order.findMany({
        where: {
            deliveredById: req.user.id
        },
        include: {
            menu: {
                select: {
                    name: true,
                    providedBy: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    })

    res.json({data: orders})
}