# Authenticate and authorize

This application uses [Laravel](https://laravel.com/) and [Laravel Passport](https://laravel.com/docs/8.x/passport) .  
Please see documents.

## API definitions

### POST /oauth/tokens

https://laravel.com/docs/8.x/passport#requesting-tokens-converting-authorization-codes-to-access-tokens

### POST /oauth/introspect

https://github.com/userh-dev/laravel-oauth-introspect

```
curl -X POST \
-H "Authorization: Bearer accessToken" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "token=accessToken" \
http://localhost:8080/oauth/introspect
```

