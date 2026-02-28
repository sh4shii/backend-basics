import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", ""); // Bearer <token> -> extract token

  if (!accessToken) {
    return res.status(401).json({ message: "No access token provided" });
  }

  try {
    const decodedUserInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decodedUserInfo; // same payload with which it was encoded, for now it is  { userId: user._id, email: user.email } in generateToken
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // This specific error tells the frontend to hit the /refresh route
      return res
        .status(401)
        .json({ message: "Access token expired", code: "TOKEN_EXPIRED" });
    }
    return res.status(403).json({ message: "Invalid access token" });
  }
};

export default authMiddleware;
