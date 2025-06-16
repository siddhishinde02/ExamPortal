const studentService=require("../services/studentService"); 



exports.getProfile = (req, res) => {
 res.render("home.ejs")
};
exports.getNavBar=(req,res)=>
{

res.render("nav.ejs")
};
exports.getstudlogin=(req,res)=>
{

res.render("studentlogin.ejs",{message:""})
};
exports.getStudregPage=(req,res)=>
{
  res.render("studentreg.ejs",{message:""})
}
exports.studentdashboard=(req,res)=>
{
  res.render("studentdashboard.ejs");
}
const conn = require("../config/db");
const jwt = require("jsonwebtoken");

exports.registerStudent = (req, res) => {
  const { sname, semail, scontact, spassword } = req.body;

  const sql = "INSERT INTO student (sname, semail, scontact,  spassword) VALUES (?, ?, ?, ?)";
  const values = [sname, semail, scontact, spassword];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error inserting student:", err.message);
      return res.status(500).render("studentreg",{message:"Registration failed"});
    }

    // Generate JWT Token
    const token = jwt.sign({ id: result.insertId, spassword }, "secretKey123", {
      expiresIn: "1h"
    });

    // Send token in cookie or response
    res.cookie("token", token, { httpOnly: true });
   res.render("studentreg", { message: "Student Registered Successfully" });
  });
};

//validate user for login

// exports.validateUser = (req, res) => {
//   const { sname, spassword } = req.body;

//   const sql = "SELECT * FROM student WHERE sname = ? AND spassword = ?";
//   conn.query(sql, [sname, spassword], (err, results) => {
//     if (err) {
//       return res.render("studentlogin", { message: "Server error" });
//     }

//     if (results.length === 0) {
//       return res.render("studentlogin", { message: "Invalid username or password" });
//     }

//     // Save to session
//     const student = results[0];
//     req.session.student = {
//       sid: student.sid,
//       sname: student.sname,
//     };

//     res.redirect("/student/dashboard");
//   });
// };
exports.validateUser = (req, res) => {
  const { sname, spassword } = req.body;

  const sql = "SELECT * FROM student WHERE sname = ? AND spassword = ?";
  conn.query(sql, [sname, spassword], (err, results) => {
    if (err) {
      return res.send("Server error");
    }

    if (results.length === 0) {
      return res.send("Invalid username or password");
    }

    req.session.student = {
      sid: results[0].sid,
      sname: results[0].sname,
    };

    return res.send("success");
  });
};

//student dashboard
exports.getStudentDashboard = (req, res) => {
  if (!req.session.student) {
    return res.redirect("/studentlogin");
  }

  res.render("studentdashboard.ejs");
};


//logout

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out");
    }
    res.redirect("/studentlogin");
  });
};

//this logic for student view 
exports.getStudentView=(req,res)=>
{
const studentId = req.session.student?.sid;
if(!studentId)
{
  return res.redirect("/student/validate");
}
studentService.getStudentById(studentId,(err,student)=>
{
  if(err)
  {
    console.error("Error Fetching student:",err);
    
    return res.send("Error fetching your data");
  }
  res.render("studentview.ejs",{student});
})
}


//this ctrl is used for studentexamview
exports.getStudentExamView=(req,res)=>
{
  studentService.getExamSchedule((err,schedule)=>
  {
    if(err)
    {
      console.error("Error fetching schedule",err);
      return res.status(500).send("error fetching schedule");

    }
    res.render("studentexamview.ejs",{schedule});
  })

}



/*siddhi's code*/
const db = require("../config/db");


// Views
exports.getProfile = (req, res) => res.render("home");
/*exports.getNavBar = (req, res) => res.render("navbar");*/
/*exports.getstudlogin = (req, res) => res.render("student", { error: undefined });*/
exports.getadminlogin = (req, res) => res.render("adminlogin", { error: undefined });

// Admin login logic
exports.postAdminLogin = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admin WHERE aname = ? AND apassword = ?";

  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length > 0) {
      res.render("adminDashboard");
    } else {
      res.render("adminlogin", { error: "Invalid username or password" });
    }
  });
};

exports.getAdminData = (req, res) => {
  const sql = "SELECT * FROM admin";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Server Error");
    res.render("adminData", { admins: results });
  });
};

exports.getSubjects = (req, res) => {
  db.query('SELECT * FROM course', (err, results) => {
    if (err) throw err;

    res.render('subject', {
      courseList: results,
      msg: req.query.msg || null
    });
  });
};

exports.addSubject = (req, res) => {
  const { cname } = req.body;
  db.query("INSERT INTO course (cname) VALUES (?)", [cname], (err) => {
    if (err) return res.status(500).send("Server error");
    res.redirect("/subject");
  });
};

exports.deleteSubject = (req, res) => {
  const courseId = req.body.cid; // must come from form input named 'cid'
  db.query("DELETE FROM course WHERE cid = ?", [courseId], (err) => {
    if (err) return res.status(500).send("Server error");
    res.redirect("/subject");
  });
};

// Show Exam Page
exports.getExamPage = (req, res) => {
  const sql = "SELECT * FROM exam";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Server error");

    console.log(results); // 🐞 Debug log
    res.render("exam", {
      examList: results,
      editingExam: null
    });
  });
};


// Add New Exam
exports.postAddExam = (req, res) => {
  const { exname, totalmark, passingmark } = req.body;
  const sql = "INSERT INTO exam (exname, totalmark, passingmark) VALUES (?, ?, ?)";
  db.query(sql, [exname, totalmark, passingmark], (err) => {
    if (err) return res.status(500).send("Server error");
    res.redirect("/exam");
  });
};

// Load Exam for Editing
exports.getExamUpdate = (req, res) => {
  const examId = req.params.id;
  db.query("SELECT * FROM exam WHERE ex_id = ?", [examId], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (!results.length) return res.status(404).send("Exam not found");

    db.query("SELECT * FROM exam", (err2, allExams) => {
      if (err2) return res.status(500).send("Server error");
      res.render("exam", {
        examList: allExams,
        editingExam: results[0]
      });
    });
  });
};

// Submit Exam Update
exports.postExamUpdate = (req, res) => {
  const { exname, totalmark, passingmark } = req.body;
  const examId = req.params.id;

  const sql = "UPDATE exam SET exname = ?, totalmark = ?, passingmark = ? WHERE ex_id = ?";
  db.query(sql, [exname, totalmark, passingmark, examId], (err) => {
    if (err) return res.status(500).send("Server error");
    res.redirect("/exam");
  });
};


// Delete Exam
exports.deleteExam = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM exam WHERE ex_id = ?", [id], (err) => {
    if (err) return res.status(500).send("Server error");
    res.redirect("/exam");
  });
};