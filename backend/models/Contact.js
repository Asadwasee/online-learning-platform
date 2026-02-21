const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter valid email"],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
