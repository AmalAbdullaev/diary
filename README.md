# diary
Diary app

Запуск проекта

Клиент: 
..cd client
npm install
npm run-script start

Сервер: 
..cd server
npm install
node server

Реализован электронный дневник с возможностью добавления записей, редактирования, удаления. При добавлении записи пишется заголовок, 
сам текст, и сохраняется текущая дата. Дополнительно для удобства пользователя был сделан поиск по записям и сверху в шапке
указано общее количество записей. Также еще была сделана возможность добавления категорий для записей (теги) которыми можно 
группировать записи в дневники. Тегов можно добавлять несколько. Также можно сортироватьь записи по тегам. Если нужно создать
новый тег(категорию) достаточно слева в сайдбаре добавить название и цвет нажать кнопку добавить категорию. Цвета позволяют
визуально отделать категории и придают более красивое и интересное оформление записям.

  {
    "id": 2,
    "title": "Дневник",
    "description": "Описание",
    "date": "2019-07-14T19:11:15.413Z",
    "categories": [
      {
        "color": "#2ef8de",
        "name": "Работа",
        "id": 0
      }
     ]    
  }
  
  JSON визуально отображается схему данных.
  
  Категории хранятся в виде отдельного JSON 
  [
  {
    "color": "#2ef8de",
    "name": "Работа",
    "id": 0
  },
  {
    "name": "Саморазвитие",
    "color": "#ff80ff",
    "id": 3
  },
  {
    "color": "#a277bb",
    "name": "Огород",
    "id": 5
  }
 ]
  
  Cвязи записей и категорий синхронизируются по ID
  
  
  
  
  
  
  
  
  
  
