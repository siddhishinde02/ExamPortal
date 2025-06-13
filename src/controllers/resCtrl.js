exports.getProfile = (req, res) => {

  res.send("Welcome to Exam Application");
};

exports.getNavBar = (req, res) => {
  res.render("navbar");
};

exports.getstudlogin = (req, res) => {
  res.render("student");
};

exports.getadminlogin = (req, res) => {
  res.render("adminlogin");
};
exports.postAdminLogin = (req, res) => {
  const { username, password } = req.body;

  const adminUsername = "admin";
  const adminPassword = "admin123";

  if (username === adminUsername && password === adminPassword) {
    // You can redirect or show a success page
    return res.send("Admin login successful");
  }
   else 
   {
    // On failure, show the form again with error
    return res.render("adminlogin", { error: "Invalid username or password" });
  }
};

  res.send("Welcome to movie recommendation application");
};

// this is registration controller

