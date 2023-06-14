import prisma from "../db";
import { Client } from "@googlemaps/google-maps-services-js";

export const createOrder =async (req, res) => {
    // Finding Rider
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

    // Finding LatLng Coordinates
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        select: {
            latitude: true,
            longitude: true
        }
    })

    const userLatLng = [{ lat: Number(user.latitude), lng: Number(user.longitude) }]

    const meal = await prisma.meal.findUnique({
        where: {
            id: req.body.menuId
        },
        include: {
            providedBy: {
                select: {
                    latitude: true,
                    longitude: true
                }
            }
        }
    })

    const partnerLatLng = [{ lat: Number(meal.providedBy.latitude), lng: Number(meal.providedBy.longitude) }]

    console.log(partnerLatLng)
    console.log(userLatLng)
    // Calculating Distance
  const client = new Client({});

  const secret = "AIzaSyCvRopYpGqGe8qozVWsQKkBwNVuE0pc5FM";

    let distance = await  client
    .distancematrix({
      params: {
        key: secret,
        origins: userLatLng,
        destinations: partnerLatLng,
      },
    })
    .then((r) => {
        console.log(r.data.rows[0].elements[0].distance.value)
      return r.data.rows[0].elements[0].distance.value
    })
    .catch((e) => {
      console.log(e.response.data.error_message)
      return -1
      ;
    });

    console.log(distance)

    // Creating Order
    const order = await prisma.order.create({
        data: {
            menuId: req.body.menuId,
            deliveredById: id,
            deliveredToId: req.user.id,
            frozen: distance > 10000 ? true : false
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