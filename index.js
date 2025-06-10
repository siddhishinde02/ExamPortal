let app=require("./src/app.js");

let port=3000;


app.listen(port,(req,res)=>{
    console.log("server started "+port);
});