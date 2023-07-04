// Импорт модуля 'express'
import express from 'express';

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
        // Определение маршрута для корневого URL ('/')
        this.app.get('/' ,(req,res)=>{
            // Проверка, есть ли у пользователя активная сессия
            if(this.controller.isSession(req,res)){
                // Если у пользователя есть активная сессия, вызов метода 'mainUserPage' контроллера
                this.controller.mainUserPage(req,res);
            } 
            else{
                // Если у пользователя нет активной сессии, вызов метода 'mainPageGeneral' контроллера
                this.controller.mainPageGeneral(req,res);
            }
        });

        // Определение маршрута для URL '/register'
        this.app.get('/register',(req,res)=>{
            // Проверка, есть ли у пользователя активная сессия
            if(this.controller.isSession(req,res)){
                // Если у пользователя есть активная сессия, вызов метода 'mainUserPage' контроллера
                this.controller.mainUserPage(req,res);
            } 
            else{
                // Если у пользователя нет активной сессии, вызов метода 'registrationPage' контроллера
                this.controller.registrationPage(req,res);
            }
        });

        // Определение маршрута для URL '/login'
        this.app.get('/login',(req,res)=>{
            // Проверка, есть ли у пользователя активная сессия
            if(this.controller.isSession(req,res)){
                // Если у пользователя есть активная сессия, вызов метода 'mainUserPage' контроллера
                this.controller.mainUserPage(req,res);
            } 
            else{
                // Если у пользователя нет активной сессии, вызов метода 'loginPage' контроллера
                this.controller.loginPage(req,res);
            }
        });
    }
}
