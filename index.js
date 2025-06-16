let app = require("./src/app.js");

let port = process.env.PORT || 3000;

let port = process.env.PORT ;


app.listen(port, () => {
  console.log("Server started on port " + port);
});