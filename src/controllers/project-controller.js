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
    res.status(200).json({ message: "user created" });
  } catch (error) {
    res.status(500).json({ error: "happend error" });
  }
};

export const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  const verifiedEmail = await User.findOne({ email });
  if (!verifiedEmail) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  const correctPass = verifiedEmail.password;
  const validPass = password === verifiedEmail.password;

  if (!validPass) {
    res.status(404).json({ error: { correctPass, password, validPass } });
    return;
  }

  res.status(200).json({ message: "Successfully logged in" });
};

export const getEntertainment = async (req, res) => {
  try {
    const entertainment = await Entertainment.find();
    res.status(201).json(entertainment);
    return entertainment;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "can't take info" });
  }
};

export const setBookmark = async (req, res) => {
  try {
    const clientEmail = req.params.email;
    const id = req.params.id;
    const { isBookmarked } = req.body;

    const user = await User.findOne({ email: clientEmail });

    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    const ContentItem = user.entertainmentInfo.id(id);

    if (!ContentItem) {
      return res.status(400).json({ error: "entertainment item not found" });
    }

    ContentItem.isBookmarked = isBookmarked;

    await user.save();

    res.json({ message: "bookmark update" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "didn't update data" });
  }
};

export const fetchUserEntertainmentInfo = async (req, res) => {
  try {
    const userEmail = req.query.email;
    const user = await User.findOne({ email: userEmail }, "entertainmentInfo");
    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    res.status(200).json(user.entertainmentInfo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
