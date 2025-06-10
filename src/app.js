let express=require("express");
let bodyparser=require("body-parser");
let session=require("express-session");
let router=require("../src/routes/regrouts.js");
let conn=require("./config/db.js");
let app=express();

app.use(bodyparser.urlencoded({extended:true}));                                                                                          
app.use(bodyparser.json());
app.use(session({
    secret:"111111111fdf",
    resave:false,
    saveUninitialized:false
}))
app.use("/",router);
app.set('view engine','ejs');
app.use(express.static("public"));

module.exports=app;