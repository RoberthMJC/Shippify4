const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "shippify-hiring.cv2sgxogwffx.sa-east-1.rds.amazonaws.com",
  user: "candidate4",
  password: "ubnpS3rySnj88Sum",
  database: "shippify4",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting database: " + err.stack);
  }
  console.log("Database server running.");
});

module.exports = connection;
