# laravel-passport-example

![test](https://user-images.githubusercontent.com/14346370/130815411-065ac244-78c2-47b4-b9f6-8910dff0bfbc.png)

## Server setup

```
$ docker-compose build
$ docker-compose up -d
```
Open `http://localhost:8080` and check pages.  

### Create your user

Create a user from signup form.

### Create tokens

Create a client id and secret for OAuth2.  

- user id associated with client to be created
- client application name
- callback URL

```
$ docker-compose run auth php artisan passport:client
Creating sample-passport_auth_run ... done

 Which user ID should the client be assigned to?:
 > 1

 What should we name the client?:
 > test

 Where should we redirect the request after authorization? [http://localhost/auth/callback]:
 > http://localhost:3000/auth/callback

New client created successfully.
Here is your new client secret. This is the only time it will be shown so don't lose it!

Client ID: xxxxxxxx-yyyy-yyyy-zzzz-xxxxxxxe
Client secret: aaaaaaaaaaaaaaaaaaa
```
Make a note of the client id and secret.

## Client Setup

```
$ cd client
```

Fill `OAUTH2_CLIENT_ID` and `OAUTH2_CLIENT_SECRET` in `.env` .  
And install npm modules.

```
$ npm install
```

### Run

```
$ npm run dev
```
Open `http://localhost:3000` .

## URLs

| URL | Application |
----|---- 
| localhost:3000 | client |
| localhost:8081 | web |
| localhost:8080 | auth |
| localhost:8000 | api |

## Stop

```
$ docker-compose down -v
```
