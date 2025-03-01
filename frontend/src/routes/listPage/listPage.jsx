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
    async function getRooms() {
      try {
        const filters = Object.fromEntries(searchParams.entries()); // Convert search params to object
        const rooms = await fetchRooms(filters); // Fetch data with filters
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
          <Filter />
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
