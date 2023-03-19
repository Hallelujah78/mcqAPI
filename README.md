# mcqAPI

This is a simple auth api in ExpressJS that uses jsonwebtoken. It stores username, email, and hashed password in a MongoDB Atlas database. It has a restricted dashboard route that informs the user of their name, email address and user ID. This is based on John Smilga's jobs API project for his NodeJS Tutorial and Projects Course. In addition, I've added a deleteAccount controller and route that allows the user to delete their account. I've also included the deep-email-validator package and use this to inform the user if their email is fake or genuine.

I wanted to keep this simple, and so I grouped the deleteAccount and dashboard controllers and routes in the auth.js file. The deleteAccount controller should be in its own controller along with, say, updateEmail and updateName, etc. Similarly, the delete-account route should be in a separate route file. The dashboard controller and route are only included for testing and to provide a restricted route that demonstrates that authentication is functioning correctly.

# Packages Used:

- deep-email-validator
- express
- dotenv
- express-async-errors
- bcryptjs
- helmet
- cors
- xss-clean
- express-rate-limit
- jsonwebtoken
- http-status-codes
- mongoose
- nodemon
- swagger-ui-express
- yamljs

# .env

- MONGO_URI - connection string for your database
- JWT_SECRET - a 256 bit encryption key
- JWT_TIME - expiry time for tokens
