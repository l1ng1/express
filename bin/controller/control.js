import path from 'path';
import fs from 'fs';
export class Controller{
    sidAge =220;
    constructor(service){
        this.service = service;
        this.dir = process.cwd();
    }


    mainUserPage(req,res,next){
        const cookies =this.getCookies( req.header('Cookie'));
        let sid = cookies.sid;
        if(sid && this.service.session.isLogged(sid)){
            let userData = this.service.session.getUserData(sid);
            let fname =path.join(this.dir,'public','index-in.html');
            fs.readFile(fname,'utf-8',(err,data)=>{
                if(data){
                    let html =data.replace('%name%',userData);
                    res.status(200).send(html);
                } else{
                    res.status(404).send('Такой страницы нет');
                }
            });
        } else{
            next();
        }
    }


    mainPageGeneral(req,res,){
        this.chekSid(req,res,'index');
        let fname =path.join(this.dir,'public','index.html');
        res.sendFile(fname);
    }

    chekSid(req,res,step){
        let cookies =this.getSid(req);
        if(!cookies.sid){
            sid = this.service.newSid(this.sidAge);
            res.setHeader('Set-Cookie',`sid=${sid}; Max-Age=120; HttpOnly`);
        }
        this.service.updateSession(cookies.sid,step);
    }

    registrationPage(req,res){
        this.chekSid(req,res,'registration');
        let fname =path.join(this.dir,'public','register.html');
        res.sendFile(fname);
    }


    loginPage(req,res){
        this.chekSid(req,res,'login');
        let fname =path.join(this.dir,'public','login.html');
        res.sendFile(fname);
    }


    confirmPage(req,res){
        this.chekSid(req,res,'confirm');
        let fname =path.join(this.dir,'public','confirm.html');
        res.sendFile(fname);
    }


    redirToUserPage(req,res){
        this.chekSid(req,res,'logged');
        let fname =path.join(this.dir,'public','redirToUser.html');
        res.sendFile(fname);
    }

    chekCaptcha(req,res,next){
        const sid = this.getSid(req);
        const username = req.body['userName'];
        const email = req.body['userEmail'];
        const passw = req.body['password'];
        const confirmPassw = req.body['passwordChek'];
        const captcha = req.body['captcha'];

        const isOK = this.service.chekCaptcha(sid,username,email,passw,confirmPassw,captcha);

        if(isOK){
            next();
        }else {
            res.status(400).send('Bad registration data');
        }
    }


    chekConfirmCode(req,res,next){
        const sid = this.getSid(req);
        const code = req.body['captchaChek'];
        const isOk =this.service.chekConfirmCode(sid,code);

        if(isOK){
            next();
        }else{
            res.status(400).send('Bad confirm code');
        }

    }



    getSid(req){
        const cookies =this.getCookies(req.header('Cookie'));
        return cookies.sid;
    }



    // Функция для парсинга cookie из строки
    getCookies(cookieString) {
    let cookies = {};
    const cookieArray = cookieString.split(';');
    for (let x of cookieArray) {
        const [key, value] = x.trim().split('=');
        cookies[key] = value; 
    }
    return cookies;
}

}