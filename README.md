# Greetings-Typescript-Backend

This project is a backend application for managing greetings in various languages. It provides a RESTful API for interacting with greeting data.

## Badge
[![Node.js CI](https://github.com/tommyshado/ts-mocha-go/actions/workflows/node.js.yml/badge.svg)](https://github.com/tommyshado/ts-mocha-go/actions/workflows/node.js.yml)

## API Documentation

The base URL for all API endpoints is: 
```
https://greetings-typescript-backend.onrender.com/api
```

## API Endpoints

### Get All Languages

- **Endpoint:** `/api`
- **Method:** `GET`
- **Description:** Retrieves a list of all available languages.

### Add a Language with relevant greeting

- **Endpoint:** `/api/addGreeting`
- **Method:** `POST`
- **Request Body:**
 - `language`: The name of the language to add.
 - `greeting`: The greeting text.
- **Description:** Adds a new language & a greeting to the list of available languages & greeting.

### Get Greeting Counter

- **Endpoint:** `/api/counter`
- **Method:** `GET`
- **Description:** Retrieves the total count of all greetings.

### Get a Greeting

- **Endpoint:** `/api/greeting`
- **Method:** `GET`
- **Path Parameter:**
 - `username`: The username of the greeting to retrieve.
 - `language`: The language of the greeting to retrieve.
- **Description:** Retrieves a specific greeting using a username & a language.

## Running Tests

To run the tests, follow these steps:

1. Ensure you have Node.js installed on your system. You can check this by running `node -v` in your terminal. If you don't have Node.js installed, you can download it from [Node.js official website](https://nodejs.org/).

2. Install the project dependencies by running `npm install` in the project root directory.

3. Run the tests by executing the command `npm test`. This command will run all the tests in the `test` directory using Mocha, as configured in the `package.json` file.

4. (Optional) If you want to run a specific test file, you can do so by specifying the file path after the `npm test` command. For example, `npm test test/myTestFile.ts`.

5. After the tests have completed, you will see the results in your terminal.

### Additional Notes

- If you encounter any issues running the tests, ensure that all dependencies are correctly installed and that your environment meets the project's requirements.
- For more detailed information on the tests, including coverage reports, refer to the `test` directory and the `ts-mocha` configuration in the `package.json` file.

### Contributing

If you're interested in contributing to this project, please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

### License

This project is licensed under the [ISC License](LICENSE).