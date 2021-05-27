const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //Email exist
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "Email or Password doesnt exist" });
    }
    //User is active
    if (!usuario.state) {
      return res.status(400).json({ msg: "state : false" });
    }
    //Check passowrd

    const validPasword = bcrypjs.compareSync(password, usuario.password);
    if (!validPasword) {
      return res.status(400).json({ msg: "password is not correct" });
    }
    // Generate JWT
    const token = await generateJWT(usuario.id);

    res.json({
      msg: "ok",
      usuario,
      token,
    });
    console.log({ email, password, token });
  } catch (error) {
    console.log(error);
    res.status.json({
      msg: "Error cached, contact support",
    });
  }
};

module.exports = {
  login,
};
