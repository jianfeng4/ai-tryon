# VDbackend

EDITING
Pull from origin/main again after the updates.

Current version: 

```
VERSION_DAZZR = 'Ver_0_1_1-20240823'
VERSION_USERS = 'Ver_U_0_1_1-20240823'
VERSION_PAYMENTS = 'Ver_P_0_1_0-20240808'
```
## FOR TESTING
Now we are running AWS to test the backend. You can start from ```http://54.151.67.121:8867/users/login/```

You can also use ```'username'='admin','password'='admin'``` to log into ```http://54.151.67.121:8867/admin``` to check userdatabase stats
## ALWAYS USE YOUR OWN BRANCH!!!
Modify your-working-dir and branch-of-your-name

## We are using submodules. Here are some pull examples. 

```
git clone https://github.com/VogueDiffusion/VDbackend.git your-working-dir
cd your-working-dir
git submodule init
git checkout -b branch-of-your-name
git push origin branch-of-your-name
```

## Based on what you are working on, update every submodule
```
git submodule update --remote ./VD_test_version/users
git submodule update --remote ./VD_test_version/payments
cd VD_test_version
```

## Based on what you are working on, checkout every submodule
```
cd users
git checkout -b branch-of-your-name
git push origin branch-of-your-name
cd ..
```
```
cd payments
git checkout -b branch-of-your-name
git push origin branch-of-your-name
cd ..
```

## Use your preferred environment and then install packages
```
pip install -r requirements.txt
```

## Setting Migrations and Runserver
Starting from ```your-working-dir```
```
cd VD_test_version
python manage.py makemigrations
python manage.py migrate
python .\manage.py runserver 8867
```
You can use other port than 8867, check at https://www.portchecktool.com/

## Create superuser and check /admin
Shut server down and add superuser
```
python manage.py createsuperuser
```
```
python manage.py runserver 8867
```
and open in your browser http://127.0.0.1:8867/admin/

## NOW GLOBAL VARIABLES ARE MOVED IN SETTINGS.PY
Currently file ```prompt.json``` is ignored for testing, you can create an empty file in ```./VD_test_version/```(not ```./VD_test_version/VD_test_version/```) and rename it to avoid errors.

The user database is now hosted using POSTSQL.

For testing other sections, you switch to sqlite in ```VD_test_version/settings.py``` and make migrations again.
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'mydatabase',
#         'USER': 'myuser',
#         'PASSWORD': 'mypassword',
#         'HOST': '127.0.0.1',
#         'PORT': '5432',
#     }
# }
```
If you don't have a POSTSQL database before, there might be some privalege issues, you might need to grant psql superuser role to myuser (and restart service).

(clearing ```/users/migrations/``` and makemigration and migrate might be an idea, or you can just test with sqlite).

## NOW WE ARE ADDING RATE LIMIT OF 5 TIMES PER MIN ON MOST OF APIS/TEST WEBPAGES