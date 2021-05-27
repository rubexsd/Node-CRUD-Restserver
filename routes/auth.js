const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { fieldValidations } = require("../middleware/fieldValidation");
const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is mandatory fiel").isEmail(),
    check("password", "Password is mandatory field").not().isEmpty(),
    fieldValidations,
  ],
  login
);

module.exports = router;
