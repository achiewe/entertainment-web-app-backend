import Entertainment from "../models/Entertainment.js";
import User from "../models/userSchema.js";

export const PostInfo = async (req, res) => {
  try {
    const data = req.body;
    const result = await Entertainment.insertMany(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "info cannot post" });
  }
};

export const fetchEntertainmentInfo = async () => {
  try {
    const entertainment = await Entertainment.find();
    return entertainment;
  } catch (error) {
    console.log(error);
    throw new Error("error happend while get data");
  }
};

export const UserInfo = async (req, res) => {
  try {
    const { email, password } = req.body;

    const utilizeEmail = await User.findOne({ email });

    if (utilizeEmail) {
      return res
        .status(400)
        .json({ error: "Email address is already registered" });
    }

    const entertainmentInfo = await fetchEntertainmentInfo();

    const newUser = new User({
      email,
      password,
      entertainmentInfo: entertainmentInfo,
    });

    await newUser.save();
  } catch (error) {
    res.status(500).json({ error: "happend error" });
  }
};

export const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const verifiedEmail = await User.findOne({ email });
  if (!verifiedEmail) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const correctPass = verifiedEmail.password;
  const validPass = password === verifiedEmail.password;

  if (!validPass) {
    res.status(404).json({ error: { correctPass, password, validPass } });
  }

  res.status(200).json({ message: "Successfully logged in" });
};
