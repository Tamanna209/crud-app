import express from "express";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";


//intia
const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT= process.env.PORT || 3000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{
    console.log("DB Connected succesfuly");

    app.listen(PORT, ()=>{
        console.log(`Server is runnning on port ${PORT}`)
    })
}).catch(err => console.log(err))


app.use("/api", route);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});