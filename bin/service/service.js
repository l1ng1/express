import { SessionService } from './session.js';
import { CaptchaService  } from './captcha.js';

export class Service {
    sessions = {};

    constructor(dataStorage) {
        this.dataStorage = dataStorage;
        this.session = new SessionService();
        this.captcha = new CaptchaService(this.session);
        // this.confirm = new ConfirmService(this.session);
    }

    isLogged(sid) {
        let session = this.sessions[sid];
        return session.step === 'logged';
    }

    getUserData(sid) {
        let session = this.sessions[sid];
        let data = this.dataStorage.getUser(session.userId);
        return data;
    }

    newSid(expireSeconds) {
        let session = new Session(expireSeconds);
        let sid = Session.newSid();
        this.sessions[sid] = session;
        return sid;
    }

    updateSession(sid, step) {
        this.sessions[sid].step = step;
    }

    newCaptcha(sid){
        let session =this.sessions[sid];
        session.captcha.file = 'captcha'+ sid + 'png';
        session.captcha.value = this.captcha.create(session.captcha.file);
        return session.captcha.file;
    }

    checkCaptcha(sid, login, passw, email, captcha) {
        let session = this.sessions[sid];
        if (session.captcha.value === captcha) {
            session.userId = this.dataStorage.addUser(login, passw, email);
            this.captcha.remove(session.captcha.file);
            session.captcha.value = null;
        }
    }
}