import express from "express"


import express from "express";

import {getUser,getUserFriends,addRemoveFriend} from "../controllers/user.js";

import { verifyToken } from "../middleware/auth.js";


const router = express.Router();



//Read

router.get("/:id" , verifyToken , getUser)
router.get("/:id/friends" , verifyToken , getUserFriends)


//update

router.patch("/:id/:friendsId" , verifyToken , addRemoveFriend)

