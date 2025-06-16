const studentModel=require("../models/studentModel");
exports.getStudentById=(sid,callback)=>
{
    studentModel.findStudentById(sid,callback);
}

exports.getExamSchedule=(callback)=>
{
    studentModel.getExamSchedule(callback);
}