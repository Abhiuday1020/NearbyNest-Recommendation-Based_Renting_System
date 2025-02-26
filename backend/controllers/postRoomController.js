import prisma from "../lib/prisma.js";

export const postRoom = async (req, res) => {
    try {
        const { place, rent, distance, gender, wifi, food, parking, amenities } = req.body;

        if (!place || !rent || !distance || !gender) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const room = await prisma.room.create({
            data: {
                place,
                rent: parseFloat(rent),
                distance: parseFloat(distance),
                gender,
                wifi: wifi || "No",
                food: food || "No",
                parking: parking || "No",
                amenities: amenities || "None",
            },
        });

        res.status(201).json({ message: "Room added successfully", room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
