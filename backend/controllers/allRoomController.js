import prisma from "../lib/prisma.js";

export const allRooms = async (req, res) => {
    try {
        console.log("Received request URL:", req.url); 
        console.log("Received query params:", req.query);

        const { Place, Rent, Distance, Gender, Bedroom, Amenities } = req.body;
        console.log("Received request body:", req.body);

        let filters = {};

        if (Place && Place !== "any") {
            filters["Place"] = { contains: Place, mode: "insensitive" };
        }
        if (Gender && Gender !== "any") {
            filters["Gender"] = Gender;
        }
        if (Bedroom && Bedroom !== "any" && !isNaN(Bedroom)) {
            filters["Bedroom"] = Number(Bedroom);
        }
        if (Rent && Rent !== "any" && !isNaN(Rent)) {
            filters["Rent"] = Number(Rent); 
        }
        if (Distance && Distance !== "any" && !isNaN(Distance)) {
            filters["Distance"] = Number(Distance); 
        }
        if (Amenities && Amenities !== "any") {
            const selectedAmenities = Amenities.split(",").map(a => a.trim());
            filters["AND"] = selectedAmenities.map(amenity => ({
                Amenities: { contains: amenity, mode: "insensitive" }
            }));
        }

        console.log("Applying filters:", JSON.stringify(filters, null, 2));

        const rooms = await prisma.room.findMany({ where: Object.keys(filters).length ? filters : {} });

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error fetching filtered rooms:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
