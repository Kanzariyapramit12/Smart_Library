const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'smart_library',
    user: 'root',
    password: 'smart_@2004'
});

connection.connect((error) => {
    if(error){
        console.log("error is: ",error);
    }
    else{
        console.log("Connect to Mysql Database!")
    }
});

module.exports = connection;