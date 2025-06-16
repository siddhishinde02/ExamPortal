const conn=require("../config/db");
exports.findStudentById=(sid,callback)=>
{
    conn.query("select *from student where sid=?",[sid],(err,result)=>
    {
        if(err) return callback(err);
        callback(null,result[0]);
    })
}


exports.getExamSchedule = (callback) => {
  const sql = `
    SELECT 
      schedule.date,
      schedule.starttime,
      schedule.endtime,
      course.cname,
      exam.exname,
      exam.totalmark,
      exam.passingmark
    FROM schedule
    JOIN course ON schedule.cid = course.cid
    JOIN exam ON schedule.ex_id = exam.ex_id
  `;

  conn.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};
