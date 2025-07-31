const express = require("express");
const router = express.Router({mergeParams: true}); // mergeParams allows us to access the params from the parent route
const wrapAsync = require("../utils/wrapAsync.js"); // utility function to handle async errors
const ExpressError = require("../utils/ExpressError.js"); // custom error class for handling errors
// const {reviewSchema} = require("../schema.js"); // importing the Joi schema for validation
const Review = require("../models/review.js"); // importing the Review model
const Listing = require("../models/listing.js"); // importing the Listing model
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");



//post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));



//delete review route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,                                   //child route to delete a review
    wrapAsync(reviewController.destroyReview),
);

module.exports = router; // exporting the router to be used in app.js
