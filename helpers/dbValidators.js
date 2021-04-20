const Role = require("../models/role");
const Usuario = require("../models/usuario");

const isValidRole = async (role = "") => {
  const exitedRole = await Role.findOne({ role });
  if (!exitedRole) {
    throw new Error(`The setted role: ${role} is not in the DB`);
  }
};

const isValidEmail = async (email) => {
  const existEmail = await Usuario.findOne({ email });
  if (existEmail) {
    throw new Error(
      `The setted email: ${email} is already in use`.toUpperCase()
    );
  }
};

const existUserId = async (id = "") => {
  const existId = await Usuario.findById(id);
  if (!existId) {
    throw new Error(`The setted Id: ${id} is not in the DB`);
  }
};

// const existEmail = await Usuario.findOne({ email });
// if (existEmail) {
//   return res.status(400).json({
//     msg: "email already exist",
//   });
// }

module.exports = { isValidRole, isValidEmail, existUserId };
