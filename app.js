if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
// console.log(process.env.SECRET) // remove this after you've confirmed it is working

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); 
// const wrapAsync = require("./utils/wrapAsync.js"); // utility function to wrap async functions for error handling
const ExpressError = require("./utils/ExpressError.js"); // custom error class for handling errors
// const {listingSchema, reviewSchema} = require("./schema.js"); // importing the Joi schema for validation
// const Review = require("./models/review.js"); // importing the Review model
const session = require("express-session"); // for session management
const MongoStore = require("connect-mongo");
const flash = require("connect-flash"); // for flash messages

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js"); // importing the listings routes
const reviewRouter = require("./routes/review.js"); // importing the reviews routes
const userRouter = require("./routes/user.js"); //user Route

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connected to MongoDB");    
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err); 
    });

async function main(){
    await mongoose.connect(dbUrl); 
}

app.engine("ejs", ejsMate); // for using ejs-mate as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true})); // for parsing form data
app.use(methodOverride("_method")); // for supporting PUT and DELETE methods
app.use(express.static(path.join(__dirname, "public"))); // for serving static files(css, js, images, etc. )


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    }, 
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in mongo session store", err);
})

const sessionOptions = {
    secret: process.env.SECRET, // secret key for signing the session ID cookie
    resave: false, // do not save session if unmodified
    saveUninitialized: true, // save uninitialized sessions
    cookie: {
        httpOnly: true, // prevents client-side JavaScript from accessing the cookie
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // cookie expiration time (1 week)
        maxAge: 1000 * 60 * 60 * 24 * 7 // cookie max age (1 week)
    }
};

//root route
// app.get("/", (req, res) => {
//   res.send("Hi, I am root");        
// });

app.use(session(sessionOptions)); // using session middleware for session management
app.use(flash()); // using flash middleware for flash messages

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success"); // setting flash messages to be accessible in views
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next(); // moving to the next middleware
})

// app.get("/demouser", async(req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com", 
//         username: "delta-student",
//     });
//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// })

app.use("/listings", listingRouter); // using the listings routes
app.use("/listings/:id/reviews", reviewRouter); // using the reviews routes
app.use("/", userRouter);




app.all(/.*/,(req, res, next) => {
    next(new ExpressError(404, "Page Not Found")); // using custom error class for 404 errors  (if req does not match any route)
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong"} = err; // destructuring with default values
    res.status(statusCode).render("error.ejs", {message}); // rendering the error page with the error message
    // res.status(statusCode).send(message); // sending the error message with the status code
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});