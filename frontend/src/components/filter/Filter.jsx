import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter({ onApplyFilters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    Place: searchParams.get("Place") || "",
    Amenities: searchParams.get("Amenities")?.split(",") || [],
    Distance: searchParams.get("Distance") || "",
    Rent: searchParams.get("Rent") || "",
    Gender: searchParams.get("Gender") || "",
    Bedroom: searchParams.get("Bedroom") || "",
  }); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "Amenities") {
      setQuery((prevQuery) => {
        let updatedAmenities = prevQuery.Amenities.includes(value)
          ? prevQuery.Amenities.filter((amenity) => amenity !== value)
          : [...prevQuery.Amenities, value];

        return { ...prevQuery, Amenities: updatedAmenities };
      });
    } else {
      setQuery({ ...query, [name]: type === "number" ? Number(value) : value });
    }
  };

  const handleFilter = () => {
    const newParams = { ...query };
    if (query.Amenities.length) {
      newParams.Amenities = query.Amenities.join(",");
    } else {
      delete newParams.Amenities;
    }
  
    console.log("Updated Search Params:", newParams);
    setSearchParams(newParams); 
    if (typeof onApplyFilters === "function") {
      onApplyFilters(newParams);
    } else {
      console.error("onApplyFilters is not a function");
    }
  };
  

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("Place")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="Place">Location</label>
          <input
            type="text"
            id="Place"
            name="Place"
            placeholder="Place"
            onChange={handleChange}
            value={query.Place}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label>Amenities</label>
          <div className="checkbox-group">
            {[
              "Medical Shops",
              "Restaurants",
              "Hospital",
              "Gym",
              "Transportation",
              "Grocery Stores",
              "Stationary Shop",
              "General Purpose Store",
            ].map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  name="Amenities"
                  value={amenity}
                  checked={query.Amenities.includes(amenity)}
                  onChange={handleChange}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
        <div className="item">
          <label htmlFor="Distance">Distance Range</label>
          <select
            name="Distance"
            id="Distance"
            onChange={handleChange}
            value={query.Distance}
          >
            <option value="">any</option>
            <option value="1000">0-1 km</option>
            <option value="2000">1-2 km</option>
            <option value="3000">2-3 km</option>
            <option value="4000">3-4 km</option>
            <option value="5000">4-5 km</option>
            <option value="6000">5-6 km</option>
            <option value="7000">6-7 km</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="Rent">Price Range</label>
          <select
            name="Rent"
            id="Rent"
            onChange={handleChange}
            value={query.Rent}
          >
            <option value="">any</option>
            <option value="3000">2000-3000</option>
            <option value="4000">3000-4000</option>
            <option value="5000">4000-5000</option>
            <option value="6000">5000-6000</option>
            <option value="7000">6000-7000</option>
            <option value="8000">7000-8000</option>
            <option value="9000">8000-9000</option>
            <option value="10000">or Higher</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="Gender">Gender</label>
          <select
            name="Gender"
            id="Gender"
            onChange={handleChange}
            value={query.Gender}
          >
            <option value="">any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="Bedroom">Bedroom</label>
          <input
            type="number"
            id="Bedroom"
            name="Bedroom"
            placeholder="any"
            onChange={handleChange}
            value={query.Bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
