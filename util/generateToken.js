import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  // need to remove sensitive info like password, for now we will keep
  // TODO: need to learn about access token and refresh token

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  return token;
};

// export {generateToken};
