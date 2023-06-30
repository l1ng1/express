import fs from "fs";
import express from 'express';
import bodyParser from "body-parser";
import Captcha from 'captcha-generator-alphanumeric';
const log = console.log;
const __dir = process.cwd();

class Session{
    status=null;
    capcha={
        value:0,
        file:'',
    }
    constructor(user_id){
        this.user_id = user_id;
    }
}


let sessions = {};
let sid = getSID();
sessions[sid] = new Session(sid);

log(sessions);

const app = express();
app.use(express.static('bin'));
app.get('/', (req, res) => {
    res.setHeader("Set-Cockie", `sid=${sid}; Max-Age=120; HttpOnly`);
    res.sendFile(_dir + '/bin/index.html');
});
app.get('/login', (req, res) => {});
app.post('/login', (req, res) => {});
app.get('/register', (req, res) => {});
app.post('/confirm', (req, res) => {});
app.post('/confirmed', (req, res) => {});

app.listen(3000, () => console.log('server started'));

function getSID() {
    let time =new Date().getTime();
    let salt = Math.trunc(Math.random()*1000000000);
    return salt.toString(16) + Object.keys(sessions).length.toString(16) + time.toString(16);
}