// Импорт модуля 'express'
import express from 'express';
import bodyParser from 'body-parser';
// Создание класса 'Router'
export class Router{
    
    // Конструктор, принимающий 'controller' и 'config' в качестве параметров
    constructor(controller,config){
        // Присваивание значения параметра 'controller' свойству 'controller' экземпляра
        this.controller = controller;
        // Присваивание значения параметра 'config' свойству 'config' экземпляра
        this.config = config;
        // Создание экземпляра приложения Express и присваивание его свойству 'app' экземпляра
        this.app = express();
        this.app.use(bodyParser.urlencoded({extended:false}));
    }
    
    // Метод для запуска сервера
    start(){
        // Запуск сервера, слушая указанный порт в конфигурации
        this.server = this.app.listen(this.config.port,()=>{
            console.log('Сервер запущен на порту',this.config.port);
        });

        // Вызов метода 'createRoutes' для создания маршрутов
        this.createRoutes();
    }
    
    // Метод для остановки сервера
    stop(){
        // Закрытие сервера
        this.server.close();
    }

    // Метод для создания маршрутов
    createRoutes(){

        this.app.get('/' , this.controller.mainUserPage,
                           this.controller.mainPageGeneral);
        
        this.app.get('/register' , this.controller.mainUserPage,
                                   this.controller.registrationPage);

        this.app.get('/login' , this.controller.mainUserPage,
                                this.controller.loginPage);

        this.app.post('/confirm', this.controller.mainUserPage ,
                                  this.controller.chekCaptcha,
                                  this.controller.confirmPage);

        this.app.post('/confirmed', this.controller.mainUserPage,
                                    this.controller.chekConfirmCode,
                                    this.controller.redirToUserPage);
    }
}
