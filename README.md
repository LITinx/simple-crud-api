# Simple CRUD API

This is a basic CRUD (Create, Read, Update, Delete) API for managing users.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LITinx/simple-crud-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd simple-crud-api
   ```

3. Install dependencies:

   ```bash
   npm i
   ```

## Usage

### Running the Server

To start the server in development mode with hot reloading using nodemon:

```bash
npm run start:dev
```

### Running Tests

To run tests using Jest:

```bash
npm test
```

### Endpoints

#### Create a User

```
POST /api/users
```

Request Body:

```json
{
	"username": "Jack",
	"age": "23",
	"hobbies": ["Hiking"]
}
```

#### Get All Users

```
GET /api/users
```

#### Get a Single User

```
GET /api/users/:id
```

#### Update a User

```
PUT /api/users/:id
```

Request Body:

```json
{
	"username": "Jack",
	"age": "23",
	"hobbies": ["Hiking"]
}
```

#### Delete a User

```
DELETE /api/users/:id
```
