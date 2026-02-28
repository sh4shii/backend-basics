import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  // need to remove sensitive info like password, for now we will keep

  const token = jwt.sign(
    { userId: user._id, email: user.email }, // payload for jwt token
    process.env.JWT_ACEESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    },
  );
  return token;
};

export const generateRefreshToken = (user) => {
  // need to remove sensitive info like password, for now we will keep

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
    },
  );
  return token;
};

// export {generateAccessToken, generateRefreshToken};
