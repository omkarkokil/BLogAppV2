const express = require("express");
const { RegisterUser, loginUser } = require("../controller/user");

const router = express.Router();

router.post("/registeruser", RegisterUser);
router.post("/loginUser", loginUser);

module.exports = router;
