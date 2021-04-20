const { Router } = require("express");
const { check } = require("express-validator");
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
const fieldValidation = require("../middleware/fieldValidation");

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
    fieldValidation,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "Is not a valid Mongo ID").isMongoId(),
    check("role").custom(isValidRole),
    check("id").custom(existUserId),
    fieldValidation,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    check("id", "Is not a valid Mongo ID").isMongoId(),
    check("id").custom(existUserId),
    fieldValidation,
  ],
  userDelete
);

router.patch("/", userPatch);

module.exports = router;
