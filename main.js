import {Application} from "./bin/app.js";

const config = {
    database: {
        file: "database.sdb"
    },
    server: {
        port: 3000
    }
}
// Вместо явного указания конфига можем читать его из файла: ini, json, yaml, xml или других форматов

const app = new Application(config);
app.start();

<<<<<<< Updated upstream
=======
let sessions = {};
let sid = getSID();
sessions[sid] = new Session(sid);

const captcha = new Captcha.default();
captcha.PNGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.png`)));
captcha.JPEGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.jpeg`)));


const app = express();
app.use(express.static('bin'));


app.get('/lol', (req, res) => {
    console.log(sid);

    res.setHeader("Set-Cookie", `sid=${sid}; Max-Age=120; HttpOnly`);
    res.sendFile(__dir+'/bin/index.html');
});


app.get('/login', (req, res) => {
    let cookies = req.header("Cookies");
    log(cookies);
    res.sendFile(__dir + '/bin/login.html');
});
app.post('/login', (req, res) => {
    captcha.JPEGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.jpeg`)));
    // let userSes = sessions.
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
>>>>>>> Stashed changes
