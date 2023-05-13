import express from "express"
import { verifyToken } from "../middleware/auth"


const router = express.router()

// READ
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)


//UPDATE
router.patch("/:id/like", verifyToken, likePost)

export default router;  