import express from "express";
import  {allRooms} from "../controllers/allRoomController.js";


const router = express.Router();

router.post('/filter', allRooms);

export default router; 
 