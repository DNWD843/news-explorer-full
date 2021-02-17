# news-explorer-api

Backend проекта NEWS-EXPLORER

version: 1.0.0  
author: Dmitry Neklyudov  
license: Yandex.Practicum

**Описание проекта**  
API проекта news-explorer это express-сервер, который создает (регистрирует) и авторизует пользователей,
создает, удаляет и, по запросу, возвращает статьи, которые пользователь сохранил в своей коллекции.

**Используемые технологии**

- Node.js;
- Express.js;
- MongoDB;
- Mongoose;
- Nginx;

**Используемые команды**  
`npm run start` - запуск сервера,  
`npm run dev` - запуск сервера в режиме разработки с хот-релоуд,  
`npm run jsdoc:build` - сборка документации в папку documentation (если у Вас установлен JSDoc3),  
`npm run jsdoc:npx` - сборка документации в папку documentation (если у Вас не установлен JSDoc3)

Сервер развернут в Яндекс.Облаке. Обратиться к нему можно по адресу:  
https://api.trueseeker.students.nomoreparties.xyz  
или  
https://www.api.trueseeker.students.nomoreparties.xyz
