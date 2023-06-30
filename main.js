import fs from "fs";
import express from 'express';
import bodyParser from "body-parser";
import Captcha from 'captcha-generator-alphanumeric';

sessions = {'347692378426': {status: null, captcha:{value:0, file: ''}}};

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