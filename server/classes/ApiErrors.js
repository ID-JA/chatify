class ApiError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }

  static NotFound(message) {
    return new ApiError(404, message);
  }

  static Unauthorized(message) {
    return new ApiError(401, message);
  }

  static InternalServerError(message) {
    return new ApiError(500, message);
  }

  static CustomError(statusCode, message) {
    return new ApiError(statusCode, message);
  }
}

module.exports = ApiError;
