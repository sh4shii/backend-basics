import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Bearer <token> -> extract token

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedUserInfo = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUserInfo; // same payload with which it was encoded, for now it is  { userId: user._id, email: user.email } in generateToken
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
