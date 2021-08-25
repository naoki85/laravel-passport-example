# API

## API definitions

### GET /user

```
curl \
-H "Authorization: Bearer accessToken" \
-H "Content-Type: application/json" \
http://localhost:8000/user
```

```json
{
  "user": {
    "sub": 1,
    "username": "name",
    "active": true
  }
}
```

### GET /tasks

```
curl \
-H "Authorization: Bearer accessToken" \
-H "Content-Type: application/json" \
http://localhost:8000/tasks
```

```json
{
  "tasks": [
    {"id":1,"user_id":1,"name":"Test1","createdAt":"2021-08-17T14:51:30Z"},
    {"id":2,"user_id":1,"name":"Test2","createdAt":"2021-08-17T14:51:30Z"},
    {"id":3,"user_id":1,"name":"Test3","createdAt":"2021-08-17T14:51:30Z"}
  ]
}
```

### GET /task/:id

```
curl \
-H "Authorization: Bearer accessToken" \
-H "Content-Type: application/json" \
http://localhost:8000/tasks/1
```

```json
{
  "task": {
    "id":1,"user_id":1,"name":"Test1","createdAt":"2021-08-17T14:51:30Z"
  }
}
```

### POST /tasks

```
curl -X POST \
-H "Authorization: Bearer accessToken" \
-H "Content-Type: application/json" \
-d "{'title':'New Item'}" \
http://localhost:8080/tasks
```

```json
{
  "task": {
    "id":4,"user_id":1,"name":"New Item","createdAt":"2021-08-17T14:51:30Z"
  }
}
```

### PUT /tasks/:id

```
curl -X PUT \
-H "Authorization: Bearer accessToken" \
-H "Content-Type: application/json" \
-d "{'title':'Update Item'}" \
http://localhost:8080/tasks/4
```

```json
{
  "task": {
    "id":4,"user_id":1,"name":"Update Item","createdAt":"2021-08-17T14:51:30Z"
  }
}
```

### DELETE /tasks/:id

```
curl -X PUT \
-H "Authorization: Bearer accessToken" \
-H "Content-Type: application/json" \
http://localhost:8080/tasks/4
```

```json
{
  "message": "success"
}
```
