const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ masg: "Token required" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);
    // if (!usuario) {
    //   res.status(401).json({
    //     mgs: "Invalid tokern - user doesnt exist",
    //   });
    // }

    // if (!ususrio.state) {
    //   res.status(401).json({
    //     mgs: "Invalid tokern - user state false",
    //   });
    // }
    !usuario
      ? res.status(401).json({
          mgs: "Invalid tokern - user doesnt exist",
        })
      : !usuario.state
      ? res.status(401).json({
          mgs: "Invalid tokern - user state false",
        })
      : (req.usuario = usuario);

    console.log(token);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "invalid token",
    });
  }
};

module.exports = { validateJWT };
