const ExpressError = require("./expressError");

// ########################################################
// This is middleware Function that runs after the request and before response
function logger(req, res, next) {
  console.log(`Receiveda ${req.method} request to ${req.path}`);
  return next();
}

module.exports = { logger };