import prisma from "../db";

export const createNewMeal = async (req, res) => {
    const meal = await prisma.meal.create({
        data: {
            name: req.body.name,
            providedById: req.user.id
        }
    })

    res.json({meal})
}

export const getMeals = async (req, res) => {
    const meals = await prisma.meal.findMany({
        select: {
            name: true
        }
    })

    res.json({data: meals})
}

export const getMeal = async (req, res) => {
    const meal = await prisma.meal.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({data: meal})
}