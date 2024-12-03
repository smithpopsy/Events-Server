require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cloudinary = require('cloudinary').v2
const eventRouter = require('./routes/eventRouter')

// cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});


//MIDDLEWARE
app.use(fileupload({useTempFiles:true}))    
app.use(express.json());
app.use(cors());
//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Mb Events Server" });
});
app.use("/api/v1", userRouter);
app.use('/api/v1/events', eventRouter)

//db connection

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "mbevents" });
    app.listen(PORT, () => {
      console.log(`server running on part : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

//error route
app.use((req, res) => {
  res.status(401).json({ success: false, message: "ROUTE NOT FOUND" });
});
