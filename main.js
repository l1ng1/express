import fs from "fs";
import express from 'express';
import bodyParser from "body-parser";
import Captcha from 'captcha-generator-alphanumeric';
const log = console.log;
const __dir = process.cwd();
log(__dir)

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
    res.cookie("Set-Cookie", `sid=${sid}; Max-Age=120; HttpOnly`);``
    res.sendFile(__dir + 'bin/index.html');
});
app.get('/login', (req, res) => {
    let cookies = req.header("Cookies");
    res.sendFile(__dir + '/bin/login.html');
});
app.post('/login', (req, res) => {
    let cookies = req.header("Cookies");
    res.sendFile(__dir + '/bin/login.html');
});
app.get('/register', (req, res) => {
    let cookies = req.header("Cookies");
    res.sendFile(__dir + '/bin/register.html');
});
app.post('/confirm', (req, res) => {
    let cookies = req.header("Cookies");
    res.sendFile(__dir + '/bin/confirm.html');
});
app.post('/confirmed', (req, res) => {
    let cookies = req.header("Cookies");
    res.sendFile(__dir + '/bin/index-in.html');
});

app.listen(3000, () => console.log('server started'));

function getSID() {
    let time =new Date().getTime();
    let salt = Math.trunc(Math.random()*1000000000);
    return salt.toString(16) + Object.keys(sessions).length.toString(16) + time.toString(16);
}