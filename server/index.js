import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"

import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { posts, users } from "./fakeData/index.js";



// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config();

const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))




//File Storgae
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, file.originalname);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });


// Routes with file
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost)


//Routes
app.use("/auth", authRoutes);


//USER ROUTES --> 
app.use("/users", userRoutes)


//MONGOOSE SETUP
const PORT = process.env.PORT || 6001;




mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));


    //injecting manually fakeData
    // User.insertMany(users)
    // Post.insertMany(posts)

}).catch((error) => console.log(error, "did not connect"))




