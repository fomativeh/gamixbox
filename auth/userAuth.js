const { validate } = require("@telegram-apps/init-data-node");
const TOKEN = process.env.BOT_TOKEN;

// userAuth middleware function
module.exports = userAuth = async (req, res, next) => {

  if (req.path === "/") {
    // Skip auth for the '/' route
    return next();
  }

  try {
    // Access headers
    const authHeader = req.headers["authorization"];

    // Check if the Authorization header is present
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Provide authorization header" });
    }

    const initData = authHeader.split(" ")[1]; // Bearer token format
    if (!initData) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid init data" });
    }

    validate(initData, TOKEN);

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(401)
      .json({ success: false, message: "Auth failed. Invalid init data" });
  }
};
