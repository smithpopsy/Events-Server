const EVENT = require("../models/events");
const USER = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs"); //file system

const createEvent = async (req, res) => {
  const { userId } = req.user;
  const {
    date,
    title,
    startTime,
    endTime,
    location,
    description,
    tags,
    free,
    online,
    category,
  } = req.body;

  try {
    if (
      !date ||
      title ||
      startTime ||
      endTime ||
      description ||
      tags ||
      free ||
      category
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Image upload req.files
    const imageFile = req.files.images.tempFilePath;

    // upload the image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageFile, {
      use_filename: true,
      folder: "mbevents",
    });

    // delete the file from our server
    fs.unlinkSync(req.files.image.tempFilePath);

    // create a new event
    const newEvent = new EVENT({
      image: uploadedImage.secure_url,
      date,
      title,
      startTime,
      endTime,
      description,
      category,
      location: online === "true" ? "online" : location,
      tags,
      price: {
        free: free === "true",
        regular: free === "true" ? 0 : req.body?.regularPrice,
        vip: free === "true" ? 0 : req.body?.vipPrice,
      },
      hosted: userId
    });

    const event = await newEvent.save()
    res.status(201).json({success:true,event})

  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

const getUpcomingEvents = async (req, res) => {
  res.send("get upcoming events");
};

const getFreeEvents = async (req, res) => {
  res.send("get free events");
};

module.exports = { createEvent, getUpcomingEvents, getFreeEvents };
