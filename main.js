import fs from "fs";
import express from 'express';
import bodyParser from "body-parser";
import Captcha from 'captcha-generator-alphanumeric';

class session{
    status=null;
    capcha={
        value:0,
        file:'',
    }
    constructor(user_id){
        this.user_id = user_id;
    }
}


sessions = {};

const app = express();
app.get('/', (req, res) => {
    res.setHeader("Set-Cockie", `sid=347692378426; Max-Age=120; HttpOnly`);
    res.end("./index.html");
});
app.get('/login', (req, res) => {});
app.post('/login', (req, res) => {});
app.get('/register', (req, res) => {});
app.post('/confirm', (req, res) => {});
app.post('/confirmed', (req, res) => {});

app.listen(3000, () => console.log('server started'));

function getSID() {
    let time =new Date().getTime;
    let salt = Math.trunc(Math.random()*1000000000);
    return salt.toString(16) + Object.keys(sessions).length.toString(16) + time.toString(16);
}