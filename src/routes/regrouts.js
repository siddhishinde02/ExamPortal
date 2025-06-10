const express = require("express");
const router = express.Router();
const userController = require("../controllers/resCtrl");

router.get("/", userController.getProfile);

module.exports = router;
