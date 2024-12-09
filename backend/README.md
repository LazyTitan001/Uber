# Uber

## API Documentation

### POST /users/register

#### Description
This endpoint is used to register a new user. It validates the user input, hashes the password, creates a new user in the database, and returns an authentication token along with the user details.

#### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}