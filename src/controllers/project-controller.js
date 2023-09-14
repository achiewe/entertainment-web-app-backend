import Entertainment from "../models/Entertainment.js";

export const PostInfo = async (req, res) => {
  try {
    const data = req.body;
    const result = await Entertainment.insertMany(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "info cannot post" });
  }
};
