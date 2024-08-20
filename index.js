const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const connection = require('./db');


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/signup', function (req, res) {
    const username = req.body.username;
    const emailid = req.body.emailid;
    const password = req.body.password;

        connection.query("INSERT INTO users(username,emailid,password) VALUES (?,?,?)",[username,emailid,password],
        (err,result) => {
            if(err){
                console.log('Error signing up: ', err);
                res.status(500).send("Error signing up");
            }
            else{
                    res.redirect('/index.html');
            }
        }
        );
});

app.post('/index', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    connection.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (err) {
            console.log('Error logging in: ', err);
            res.status(500).send("Error logging in");
        } else if (results.length > 0) {
            res.redirect('/welcome.html');
            
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});

app.listen(7000, () => {
    console.log("Server started on port 7000");
});
