const express = require("express");
const router = express.Router();
const userController = require("../controllers/resCtrl");
router.post("/register", userController.registerStudent);
router.get("/", userController.getProfile);

router.get("/navbar",userController.getNavBar);
router.get("/studentlogin",userController.getstudlogin);
router.get("/studentreg",userController.getStudregPage);
//student 
router.post("/student/validate", userController.validateUser);
router.get("/student/dashboard", userController.getStudentDashboard);


//logout

router.get("/logout", userController.logout);


//this for login and studentview
router.get("/studentview",userController.getStudentView);

//this router is used for examview
router.get("/studentexamview",userController.getStudentExamView);



router.get("/adminlogin", userController.getadminlogin);
router.post("/admin/login", userController.postAdminLogin);
router.get("/admin/data", userController.getAdminData); //  IMPORTANT
router.get("/subject", userController.getSubjects);
router.post("/subject/add", userController.addSubject);
router.post("/subject/delete", userController.deleteSubject)
router.get("/exam", userController.getExamPage);
router.post("/exam/add", userController.postAddExam);
router.get("/exam/update/:id", userController.getExamUpdate);
router.post("/exam/update/:id", userController.postExamUpdate);
router.post("/exam/delete/:id", userController.deleteExam);


module.exports = router;



