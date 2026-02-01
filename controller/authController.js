// main logic for any api
import User from "../models/UserSchema.js"
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    // get email and password from frontend (it will be in req object)
    const { email, password } = req.body;

    // check if both email and password is coming from frontend
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password both are required' });
    }

    // run basic checks. currently ignore
    // 1. check if email is valid
    // 2. check if password is 6 length, contains 1 number, contains @ or not

    // now everything is ok, we can go with creating a user
    // first check if user exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // now we can create a new user
    // for now frontnd also sends email and backend schema is also email so we can directly use {email}
    // but if frontend sends emailId and backend schema has email then while saving it will become
    // const user = new User({ email: emailId , password: {frontend_password_field_name} });

    // if UserSchema had not the pre 'save' function defined then need to hash
    // password first here in controller before calling user.save
    /*
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({
        email,
        password: hashedPassword
      });

    */

    // here not needed, bcz handled in UserSchema.pre('save)
    const user = new User({ email, password });
    await user.save();

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password both are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      // token,
      // user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
}

export {register, login};

