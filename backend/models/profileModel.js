const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  website: {
    type: String,
  },
  profilepictureUrl: {
    type: String,
  },
  profile_banner: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
  },
  favourite_exercises: {
    type: [],
  },
});

module.exports = mongoose.model("profileModel", profileSchema);
