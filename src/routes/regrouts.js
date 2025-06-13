const express = require("express");
const router = express.Router();
const userController = require("../controllers/resCtrl");

router.get("/", userController.getProfile);
router.get("/navbar", userController.getNavBar);
router.get("/studentlogin", userController.getstudlogin);
router.get("/adminlogin", userController.getadminlogin);
router.post("/admin/login", userController.postAdminLogin);

module.exports = router;
