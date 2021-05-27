const validateJWT = require("../middleware/validate-JWT");
const fieldValidation = require("../middleware/fieldValidation");
const rolesValidation = require("../middleware/validateAdminRoles");
module.exports = { ...validateJWT, ...fieldValidation, ...rolesValidation };
