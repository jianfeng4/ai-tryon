To use `me/`, `upload-image/`, `update-measurements/`, `add-tryon-history/`, `update-subscription/` in `users/`
---
These APIs require authentication, you should first login to get the refresh and access token, and then use the access token as a cURL request header to authenticate these APIs.

The local test server is often `127.0.0.1:8867`

Some often used static domains are

`https://ideally-precise-macaque.ngrok-free.app/`

Now we are running AWS to test the backend. You can also use `http://54.151.67.121:8867/`

## When using Windows PS, use `curl.exe` and `\"`

## Now session id with csrf tokens (stored in Cookie) and JWT (stored in local storage) are both working in order.

There are several html examples: `html_register/` `html_login` `html_detail` `checked_upload`

You will mostly provide csrf token `'X-CSRFToken': csrftoken` in the headers.

## Following APIs are using JWT. For web based usage, check above html examples

1. `register/`
```
curl -L -X POST 'https://127.0.0.1:8867/users/register/' -H 'Content-Type: application/json' -d {
    "username": "AAA",
    "email": "aaa@qq.com",
    "password": "aaa",
    "first_name": "AA",
    "last_name": "A"
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

5. `upload-image/` WILL BE REPLACED
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

7. `add-tryon-history` WILL BE REPLACED
```
curl -L -X POST 'http://127.0.0.1:8867/users/add-tryon-history/' \
    -H 'Content-Type: multipart/form-data' \
    -H 'Authorization: Bearer access.token' \
    -F 'image=@"file.location"' \
    -F 'processed_image=@"file.location"' \
    -F 'prompt="{json.prompt}"' \
    -F 'timestamp=""'
```

8. `update-subscription` NEED MORE WORK
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

9. `verify_hash`
```
curl -L -X POST 'http://127.0.0.1:8867/users/verify_hash/' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer access.token' \
    -d '{
          "hash_value": hash_value,
          "data_head": data_head
        }'
```
may return 1 of 3:
```
{'status': 'exist', 'message': 'Already exists.'}

{'status': 'exist', 'message': 'Multiple copies exist.'}

{'status': 'open', 'message': 'Ready for upload.'}
```

10. `hashed_image_upload`
```
curl -L -X POST 'http://127.0.0.1:8867/users/hashed_image_upload/' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer access.token' \
    -F "image=@path/to/your/file.png"
```
This will generate an instance in database as webp image with hash code, a unique url to obtain this image for each user and each type of use (currently only ```'test upload'```).
And the uploading history is recorded.
may return 1 of 3:
```
{'status': 'success', 'url': img_url.url}

{'status': 'error', 'message': 'Failed saving.'}

{'status': 'error', 'message': 'Image not found.'}
```

11. `image/<str:url>/`
When you get the `'url'` string, you can simply go to `http://127.0.0.1:8867/users/image/<str:url>/` if you logged in with cookie, and you own it.
```
curl -L -X GET 'http://127.0.0.1:8867/users/image/<str:url>/' \
    -H 'Authorization: Bearer access.token' --output 'file.webp'
```
returns by saving a file.

12. `tryon_history_lastfew` `urlview_history_lastfew/<int:num>/` `upload_history_lastfew/<str:upload_type>/<int:num>/`
Those are similar. However, second one might bring ambiguity and loop histories. Will show the last one here.
```
curl -L -X GET 'http://127.0.0.1:8867/users/upload_history_lastfew/<str:upload_type>/<int:num>/' \
    -H 'Authorization: Bearer access.token'
```
This shows you the uploading history from the most recent. `upload_type` defines which special type (please use `test` now, pairing with the `hashed_image_upload`). It returns 4 url info staring from `num`th uploading record.
Might return less than 4 if there are not enough.

returns:
```
{
    0:{"url":"JiqXA0cCJQPDMavF","time":""2024-08-23T09:19:19.600Z""},
    1:{"url":"JiqXA0cCJQPDMavF","time":""2024-08-23T09:19:19.600Z""},
    2:{"url":"JiqXA0cCJQPDMavF","time":""2024-08-23T09:19:19.600Z""},
    "status":success,
    "num":3
}

{'status': 'error', 'message': 'History not found.'}

{'status': 'error', 'message': 'Server Error.'}
```

 <br>

curl.exe -L -X GET 'http://127.0.0.1:8867/users/image/DXsuY2jZeWdcswqg/' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NDQ4OTUyLCJpYXQiOjE3MjQ0NDc0NTIsImp0aSI6ImU1YWY0NTZhNGRlOTRjMjliOTgxZGU4ZjkzODdjODJiIiwidXNlcl9pZCI6MX0.a2QBmvPpYDO6bqhV178__d_iDrlT5Cpgdb28tVPk8qg'



