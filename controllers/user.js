const { response, request } = require("express");
const userGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    ok: true,
    msg: "Get Api - controller",
    query,
  });
  console.log(query);
};

const userPost = (req, res) => {
  const body = req.body;
  res.json({
    ok: true,
    msg: "Post Api - controller",
    body,
  });
  console.log(body);
};
const userPut = (req, res) => {
  const { id } = req.params;
  res.json({
    ok: true,
    msg: "Put Api - controller",
    id,
  });
  console.log(id);
};

const userDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "Delete Api - controller",
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
