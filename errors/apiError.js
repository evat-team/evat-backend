class APIError extends Error {
  constructor(msg) {
    super(msg);
  }
}

module.exports = APIError;
