const { Schema, model } = require("mongoose");

const roleSchema = Schema({
  role: {
    type: String,
    required: [true, "Role is a mandatory filed"],
  },
});

module.exports = model("Role", roleSchema);
