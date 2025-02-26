import express from "express";
import  {postRoom} from "../controllers/postRoomController.js";


const router = express.Router();

router.post('/post', postRoom);

export default router; 