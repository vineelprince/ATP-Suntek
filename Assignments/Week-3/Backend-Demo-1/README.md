### Steps to create Backend
    1. Generate package.json
        npm init -y 
    
    2. Create HTTP Server
        a. Install & import "express" module
            npm install <module name>
            npm install express
        b. Import express module




# HTTP REQUEST TYPES
    GET -- Read resources
    POST -- Create a new resource
    PUT -- Update a resource
    DELETE -- Delete a resource

    http://localhost:3000 => fixed & base url which is running in local machine on port 3000
    http://127.0.0.1:3000 => lookback IP address which is running on local machine

# User API:
    GET http://127.0.0.1:3000/users
    POST http://127.0.0.1:3000/users
    PUT http://127.0.0.1:3000/users/<id>
    DELETE http://127.0.0.1:3000/users/<id>
    