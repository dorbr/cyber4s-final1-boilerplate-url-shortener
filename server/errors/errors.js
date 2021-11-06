class MyError extends Error {
    // parent error
    constructor() {
      super();
      this.name = this.constructor.name;
  
      if (this instanceof NotFoundPath) {
        this.type = "Path Does Not Exist";
        this.statusCode = 404;
      } else if (this instanceof PathAlreadyExist) {
        this.type = "Path Already Exist";
        this.statusCode = 403;
      } else if (this instanceof UserAlreadyExist) {
        this.type = "User Already Exist";
        this.statusCode = 403;
      } else if (this instanceof ServerError) {
        this.type = "Server Error";
        this.statusCode = 500;
      } else if (this instanceof UserDoesNotExist) {
        this.type = "User Does Not Exist";
        this.statusCode = 401;
      }
  
      this.message = this.type; // detailed error message
    }
  }
  
  // extending to child error classes
  class NotFoundPath extends MyError {}
  class PathAlreadyExist extends MyError {}
  class UserAlreadyExist extends MyError {}
  class ServerError extends MyError {}
  class UserDoesNotExist extends MyError {}
  
  module.exports = {
    MyError,
    NotFoundPath,
    PathAlreadyExist,
    UserAlreadyExist,
    ServerError,
    UserDoesNotExist,
  };