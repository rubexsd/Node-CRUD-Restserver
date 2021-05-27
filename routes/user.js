const { Router } = require("express");
const { check } = require("express-validator");

const {
  fieldValidations,
  validateJWT,
  validateAdminRole,
  hasRole,
} = require("../middleware");
const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
} = require("../controllers/user");

const {
  isValidRole,
  isValidEmail,
  existUserId,
} = require("../helpers/dbValidators");

const router = Router();

router.get("/", userGet);

router.post(
  "/",
  [
    check("name", "put a valid name").not().isEmpty(),
    check("password", "password must be more than 6 characteres").isLength({
      min: 6,
    }),
    check("email", "put a valid email").custom(isValidEmail).isEmail(),
    //check("role", "Is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isValidRole),
    fieldValidations,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "Is not a valid Mongo ID").isMongoId(),
    check("role").custom(isValidRole),
    check("id").custom(existUserId),
    fieldValidations,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    // validateAdminRole,
    hasRole("ADMIN_ROLE", "SELLER_ROLE"),
    check("id", "Is not a valid Mongo ID").isMongoId(),
    check("id").custom(existUserId),
    fieldValidations,
  ],
  userDelete
);

router.patch("/", userPatch);

module.exports = router;
