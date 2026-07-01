class ExpressError extends Error{
    constructor(statusCode,message) {
        super();
        this.satusCode = statusCode;
        this.message = message;
    }
};
module .exports= ExpressError;