const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "This is a mandatory field"],
  },
  email: {
    type: String,
    required: [true, "This is a mandatory field"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "This is a mandatory field"],
  },
  imgURL: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "This is a mandatory field"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};
module.exports = model("Usuario", UserSchema);
