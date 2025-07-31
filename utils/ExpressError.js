class ExpressError extends Error{
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = ExpressError;
// This custom error class can be used to handle errors in a more structured way, allowing for better error handling in the application.
// It can be used in the app.js file to throw errors with specific status codes and messages