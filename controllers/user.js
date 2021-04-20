const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userGet = async (req = request, res = response) => {
  //const query = req.query;
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  // const users = await Usuario.find(query)
  //   .skip(Number(from))
  //   .limit(Number(limit));
  // const total = await Usuario.countDocuments(query);

  const [total, users] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
  console.log(total);
};

const userPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const usuario = new Usuario({ name, email, password, role });

  //Bcrypt password
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);

  //Save into DB
  await usuario.save();
  res.json({
    usuario,
  });
  console.log(usuario);
};

const userPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, ...extraData } = req.body;
  //TODO Validation ID in DB
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    extraData.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, extraData);

  res.json({
    ok: true,
    msg: "Put Api - controller",
    id,
    usuario,
  });
  console.log(id);
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  //true delete
  // const user = await Usuario.findByIdAndDelete(id);
  const user = await Usuario.findByIdAndUpdate(id, { state: false });
  res.json({
    ok: true,
    user,
  });
};

const userPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "Patch Api - controller",
  });
};
module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
};
