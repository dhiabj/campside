const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availableNetwork: {
      type: String,
      required: true,
    },
    img: [
      {
        type: String,
      },
    ],
    userId: {
      //type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
