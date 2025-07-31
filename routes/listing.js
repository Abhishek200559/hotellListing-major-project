const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // utility function to handle async errors

const Listing = require("../models/listing.js"); // importing the Listing model
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });          //stores image locally in uploads file automatically  //upload is your Multer configuration (often something like const upload = multer({ storage }))



//index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show route
router.get("/:id", wrapAsync(listingController.showListing));

// Create route
router.post(
    "/", 
    isLoggedIn,
    upload.single('listing[image]'),           //.single("...") expects one file, and stores its info in req.file
    validateListing, // middleware to validate the listing data
    wrapAsync(listingController.createListing),
);

// router.post(
//     "/", 
//     upload.single('listing[image]'),          //store uploaded image in listing[image]
//     (req, res) => { 
//         res.send(req.file);           //req.file is due to multer
//     },
// );

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Update route
router.put(
    "/:id", 
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),     //.single("...") expects one file, and stores its info in req.file
    validateListing,    // middleware to validate the listing data
    wrapAsync(listingController.updateListing)); 

//Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;
// This code defines the routes for managing listings in an Express application.