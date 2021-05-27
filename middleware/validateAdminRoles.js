const { request, response } = require("express");

const validateAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json({ msg: "want to verify role without validate token first" });
  }
  const { role, name } = req.usuario;
  if (role != "ADMIN_ROLE") {
    res.status(401).json({
      msg: `${name} Is not an Admin`,
    });
  }

  next();
};
const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res
        .status(500)
        .json({ msg: "want to verify role without validate token first" });
    }
    if (!roles.includes(req.usuario.role)) {
      return res
        .status(500)
        .json({ msg: `service require one of these roles ${roles}` });
    }
    next();
  };
};
module.exports = { validateAdminRole, hasRole };
