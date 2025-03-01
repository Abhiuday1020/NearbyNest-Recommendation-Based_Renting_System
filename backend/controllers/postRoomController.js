import prisma from "../lib/prisma.js";

export const postRoom = async (req, res) => {
    try {
        const { Place, Rent, Distance, Gender, WiFi, Food, Parking, Amenities, Bedroom, Bathroom } = req.body;

        if (!Place || !Rent || !Distance || !Gender || !Bedroom || !Bathroom) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const room = await prisma.room.create({
            data: {
                Place,
                Rent: parseInt(Rent, 10),
                Distance: parseInt(Distance, 10),
                Gender,
                WiFi: WiFi || "No",
                Food: Food || "No",
                Parking: Parking || "No",
                Amenities: Amenities || "None",
                Bedroom: parseInt(Bedroom, 10),
                Bathroom: parseInt(Bathroom, 10),
            },
        });

        res.status(201).json({ message: "Room added successfully", room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
