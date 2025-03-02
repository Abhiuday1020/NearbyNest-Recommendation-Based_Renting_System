import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fetchRooms from "../../lib/fetchRooms";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";

function ListPage() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("Search Params Changed:", Object.fromEntries(searchParams.entries()));
    
    async function getRooms() {
      try {
        const filters = Object.fromEntries(searchParams.entries()); 
        console.log("Filters sent to fetchRooms:", filters);  // Check if filters are being sent correctly
        const rooms = await fetchRooms(filters); 
        setData(rooms);
        console.log("Fetched Data:", rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
  
    getRooms();
  }, [searchParams]);
   
   

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter onApplyFilters={(params) => setSearchParams(params)} />
          {data.length > 0 ? (
            data.map((room, index) => <Card key={index} item={room} />)
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      </div>
    </div>
  );  
}

export default ListPage;
