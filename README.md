# Веб-приложение Node.js + Express + PostgreSQL (CRUD для courses)

## Установка

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Создайте таблицу в PostgreSQL:
   ```sql
   -- выполните содержимое файла create_courses_table.sql
   ```
3. Запустите сервер:
   ```bash
   npm run dev
   ```

## Примеры запросов для Postman

### Создать курс (POST)
```
POST http://localhost:3000/api/courses
Content-Type: application/json
{
  "title": "Node.js базовый",
  "description": "Изучение основ Node.js",
  "duration": 40,
  "price": 15000
}
```

### Получить все курсы (GET)
```
GET http://localhost:3000/api/courses
```

### Получить курс по id (GET)
```
GET http://localhost:3000/api/courses/1
```

### Обновить курс (PUT)
```
PUT http://localhost:3000/api/courses/1
Content-Type: application/json
{
  "title": "Node.js продвинутый",
  "description": "Углубленное изучение Node.js",
  "duration": 60,
  "price": 20000
}
```

### Удалить курс (DELETE)
```
DELETE http://localhost:3000/api/courses/1
```

---

**Не забудьте изменить настройки подключения к БД в database.js под свои!** 