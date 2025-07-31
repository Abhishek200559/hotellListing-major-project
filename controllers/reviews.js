const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); // creating a new review from the request body
    newReview.author = req.user._id;
    
    listing.reviews.push(newReview); // pushing the new review to the listing's reviews array

    await newReview.save(); // saving the new review to the database
    await listing.save(); // saving the updated listing to the database

    // console.log("new review added");
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`); // redirecting to the listing's show page
};

module.exports.destroyReview = async (req, res) => {
        let {id, reviewId} = req.params;

        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); // removing the review from the listing's reviews array
        await Review.findByIdAndDelete(reviewId); // deleting the review from the database
        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`); // redirecting to the listing's show page
    };