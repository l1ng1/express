
export  class Service {
    

    constructor(dataStorage) {
        this.dataStorage = dataStorage;
        this.session = new SessionService();
        this.captcha = new CaptchaServise(this.session);
        this.confirm = new ConfirmService(this.session);
    }
    
    isLogged(sid) {
        let session = this.session.get(sid);
        return session.step == 'logged';
    }

    getUserData(sid) {
        let session = this.session.get(sid);
        let data = this.dataStorage.getUser(session.userId);
        return data;
    }

    newSid(expireSeconds) {
        return this.session.create(expireSeconds);
    }

    updateSesion() {
        this.session.update(sid, step);
    }
}