// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "thestudybarinstance.clstjpeu5zis.us-east-1.rds.amazonaws.com",
//   user: "asenol",
//   password: "T$Bpassword",
//   database: "theStudyBarDB"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();

newdate = month + "/" + day + "/" + year;
console.log(newdate);