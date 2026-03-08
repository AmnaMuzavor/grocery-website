const jwt = require("jsonwebtoken");
// const JWT_SECRET = "mysecretkey";
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // console.log("JWT ERROR:", error.message);
    console.log("JWT_SECRET:", JWT_SECRET);
    return res.status(400).json({ message: "Invalid token" });
    
  }
};

module.exports = verifyToken;