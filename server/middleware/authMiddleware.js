const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Decoded JWT:", decoded) 
    req.user = {
      id: decoded.id,
      role: decoded.role,
    }
    next()
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" })
  }
}

module.exports = authMiddleware
