import {Session} from 'session.js';
export class Service{

    sessions = {

    }

    constructor(dataStorage){
        this.dataStorage =dataStorage;
        this.session =new SessionService();
        this.captcha =new CaptchaService(this.session);
        this.confirm =new ConfirmService(this.session);
    }

    isLogged(sid){
        let session =this.session.get(sid);
        return session.step === 'logged';
    }

    getUserData(sid){
        let session =  this.session.get(sid);
        let data = this.dataStorage.getUser(session.userId);
        return data;
    }

    newSid(expireTime){
        return this.session.create(expireTime);
    }

    updateSession(sid,step){
        this.session.update(sid,step);
    }


    chekCaptcha(sid,username,email,passw,confirmPassw,captcha){
        let session = this.session.get(sid);
        session.captcha.value = 
    }

}