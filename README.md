# UserLoginAuth
Sign up, Login and logout authentication built with Node/Express and JWT.


**POST**
Register user:
URL: localhost:3000/api/register
SAMPLE REQUEST BODY: 
{
    "username":"Atoshi",
    "pwd": "musa"
}

**POST**
USER login
URL: localhost:3000/api/auth
SAMPLE REQUEST BODY:
{
    "username":"Atoshi",
    "pwd": "musa"
}

**POST**
USER logout
URL: localhost:3000/api/logout
NO REQUEST BODY
