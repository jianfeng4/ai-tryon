To use `me/`, `upload-image/`, `update-measurements/`, `add-tryon-history/`, `update-subscription/` in `users/`
---
These APIs require authentication, you should first login to get the refresh and access token, and then use the access token as a cURL request header to authenticate these APIs.

The local test server is often ```127.0.0.1:8867```

Some often used static domains are

```https://ideally-precise-macaque.ngrok-free.app/```

When using Windows PS, use ```curl.exe``` and ```\"```

1. `register/`
```
curl -L -X POST 'https://127.0.0.1:8867/users/register/' -H 'Content-Type: application/json' -d {
    "username": "AAA",
    "email": "aaa@qq.com",
    "password": "aaa",
    "first_name": "AA",
    "last_name": "A",
    "portrait": null  # base64 image
    }
```
return:
```
{
    "id": 2,
    "username": "AAA",
    "email": "aaa@qq.com",
    "first_name": "AA",
    "last_name": "A"
}
```
2. `login/`
```
curl -L -X POST 'https://127.0.0.1:8867/users/login/' -H 'Content-Type: application/json' -d '{
    "username": "AAA",
    "password": "aaa"
    }'
```
return:
```
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMzM2OTg1NCwiaWF0IjoxNzIzMjgzNDU0LCJqdGkiOiJlZTRlN2JmNzlkZjc0YTE1OWY5MTVhMmM5NjUyNTRlNiIsInVzZXJfaWQiOjJ9.S0WkEkZ2HcpH5zwCQsbdXi4jvNv6KC2eSaaqqhgv0aU",
    # 
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjgzNzU0LCJpYXQiOjE3MjMyODM0NTQsImp0aSI6IjBhNzBmZWYxODk4OTQ1YmU5ZDkzZGRlYmQ1ZjMzZjYzIiwidXNlcl9pZCI6Mn0.pL7SlZckKzRuphtItJJ3jOeOuxu3qBiFVOSP35hnOcI",
    "user": {
        "user_id": 2,
        "username": "AAA"
    }
}
```

3. *If the access token expires, you could use `token/refresh/` to input refresh token and get a new access token:
```
curl -L -X POST 'https://127.0.0.1:8867/users/token/refresh/' -H 'Content-Type: application/json' \
    -d '{
        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMzM2OTg1NCwiaWF0IjoxNzIzMjgzNDU0LCJqdGkiOiJlZTRlN2JmNzlkZjc0YTE1OWY5MTVhMmM5NjUyNTRlNiIsInVzZXJfaWQiOjJ9.S0WkEkZ2HcpH5zwCQsbdXi4jvNv6KC2eSaaqqhgv0aU"
    }'
```
return:
```
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjg0MTU2LCJpYXQiOjE3MjMyODM0NTQsImp0aSI6IjAwMWEyMTU0Zjc2MTQxNmU4YmE2MjZiOWFkMzM3M2EyIiwidXNlcl9pZCI6Mn0.ssCIJuyPqKpFfamomYHFGbfFl3DrSM4O8A3ODfdZj-8"
}
```
current lifetime setting:
```
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
```

4. `me/`
```
curl -L -X GET 'http://127.0.0.1:8867/users/me' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjg0OTUxLCJpYXQiOjE3MjMyODM0NTQsImp0aSI6IjNiYzRhMTgwY2EwNDQ2MDNiZmY1YTM2MDlkZjVlNmI0IiwidXNlcl9pZCI6Mn0.2euLg4UxasPr3RiXerX9OkIX7jnXXsz-HOVu1d9q07k' \
    # use access token
```
return:
```
{
    "id":2,
    "username":"AAA",
    "email":"aaa@qq.com",
    "first_name":"AA",
    "last_name":"A",
    "password":"pbkdf2_sha256$720000$enBvz0Gmkvop2thn5z3UEb$bVew/t8TM2fqiWE3+wbQNsHZSauhHBv2x1928OHU2hY=",
    "bust":"0.00",
    "waist":"0.00",
    "hip":"0.00",
    "portrait_hash":"d04663ca996163e96dd66be48ed2aac3",
    "tryon_history":[],
    "credit_flex":0,
    "credit_subscribe":0,
    "subscribe_plan":{}
}
```

5. `upload-image/`
```
curl -L -X POST 'http://127.0.0.1:8867/users/upload-image/' \
    -H 'Content-Type: multipart/form-data' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjg0MTU2LCJpYXQiOjE3MjMyODM0NTQsImp0aSI6IjAwMWEyMTU0Zjc2MTQxNmU4YmE2MjZiOWFkMzM3M2EyIiwidXNlcl9pZCI6Mn0.ssCIJuyPqKpFfamomYHFGbfFl3DrSM4O8A3ODfdZj-8' \
    -F 'image=@"file.location"'
```

6. `update-measurements/`
```
curl -L -X POST 'http://127.0.0.1:8867/users/update-measurements/' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer access.token' \
    -d '{
        "bust": 40,
        "hip": 40,
        "waist": 30
    }'
```
return:
```
{
    "bust":40.0,
    "hip":40.0,
    "waist":30.0
}
```

7. `add-tryon-history`
```
curl -L -X POST 'http://127.0.0.1:8867/users/add-tryon-history/' \
    -H 'Content-Type: multipart/form-data' \
    -H 'Authorization: Bearer access.token' \
    -F 'image=@"file.location"' \
    -F 'processed_image=@"file.location"' \
    -F 'prompt="{json.prompt}"' \
    -F 'timestamp=""'
```

8. `update-subscription`
```
curl -L -X POST 'http://127.0.0.1:8867/users/update-subscription/' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer access.token' \
    -d '{
          "flex_credits": flex_credits,
          "subscription_credits": subscription_credits,
          "months": months_list
        }'
```

 <br>




