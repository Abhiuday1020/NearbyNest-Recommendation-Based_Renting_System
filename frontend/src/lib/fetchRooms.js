import apiRequest from "./apiRequest";

async function fetchRooms(filters = {}) {
  try {
    console.log("Fetching rooms with filters:", filters);
    const response = await apiRequest.post("/availableRoom/filter", filters);
    console.log("Raw API Request Body:", JSON.stringify(filters, null, 2));


    if (!Array.isArray(response.data)) {
      console.error("Invalid API response:", response.data);
      return [];
    }  

    console.log("API Response:", response.data); 
    return response.data.map((room) => ({
      id: room._id,
      place: room.Place,
      rent: room.Rent,
      distance: room.Distance,
      gender: room.Gender,
      wifi: room.WiFi,
      food: room.Food,
      parking: room.Parking,
      amenities: room.Amenities,
      bedroom: room.Bedroom,
      bathroom: room.Bathroom,
    }));
  } catch (error) {
    console.error("Error fetching rooms:", error.response?.data?.message || error.message);
    return [];
  }
}

export default fetchRooms;