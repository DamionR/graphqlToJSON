# GraphQL to JSON Converter

## Overview

The **GraphQL to JSON Converter** is a web application that enables users to convert GraphQL queries and mutations into JSON format, which can be easily processed by other applications or systems. This tool allows users to interact with a GraphQL API, input a valid GraphQL query, and get the corresponding JSON representation of that query. It can handle complex queries, mutations, fragments, and more.

The tool provides both a **frontend interface** where users can input their GraphQL query and a **backend server** that processes these queries and returns the appropriate JSON format.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How it Works](#how-it-works)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Key Features of the App](#key-features-of-the-app)
- [Installation and Usage](#installation-and-usage)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Running the Application](#running-the-application)
- [How to Use the App](#how-to-use-the-app)
- [Example Queries](#example-queries)
  - [Example 1: Simple Query](#example-1-simple-query)
  - [Example 2: Query with Arguments](#example-2-query-with-arguments)
  - [Example 3: Mutation](#example-3-mutation)
- [API Usage](#api-usage)
- [Contributing](#contributing)
- [License](#license)


## Features

- Convert GraphQL queries, mutations, and fragments into JSON.
- Handle queries with variables, arguments, and inline fragments.
- Support for dynamic GraphQL queries with custom variables.
- Easy-to-use web interface with copy and download options for JSON responses.
- Ability to upload a `.graphql` file and process it.
- GraphQL API endpoint for programmatic access.

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Express.js, GraphQL
- **Other**: GitHub for version control

## How it Works

### Frontend

The frontend of the **GraphQL to JSON Converter** is built using **React**. It provides an intuitive user interface where users can input their GraphQL query, either by typing it directly into a text area or by uploading a `.graphql` file. The frontend communicates with the backend using **Axios** to submit the query and receive the JSON response.

### Backend

The backend is built with **Express.js** and exposes a **GraphQL endpoint** using the **express-graphql** middleware. It accepts GraphQL queries and mutations, processes them, and returns the corresponding data in JSON format. The backend also provides an endpoint to convert any GraphQL query into JSON format.

### Key Features of the App

1. **GraphQL Query Input**: Users can manually input GraphQL queries and mutations in the provided text area.
2. **File Upload**: Users can upload `.graphql` files, which will automatically populate the input area with their content.
3. **JSON Response**: The response is displayed in JSON format, and users can download or copy the JSON response.
4. **Conversion**: The app can convert GraphQL queries into their JSON equivalents for further processing.

## Installation and Usage

### Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (Node Package Manager)
- **Git** (for version control)

### Clone the Repository

To get started, clone the repository using:

`git clone https://github.com/DamionR/graphqlToJSON.git && cd graphqlToJSON`

### Install Dependencies

1. **Frontend**: Navigate to the frontend directory and install dependencies with:

`cd frontend && npm install`

2. **Backend**: Navigate to the backend directory and install dependencies with:

`cd backend && npm install`

### Running the Application

Start the Backend: Navigate to the backend folder and start the server:

`cd backend && npm start`

This will start the backend server, typically running on `http://localhost:4000`.

Start the Frontend: Open a new terminal window and navigate to the frontend folder:

`cd frontend && npm start`

This will start the frontend development server, usually available at `http://localhost:3000`.

## How to Use the App

1. **Enter GraphQL Query**: In the frontend, type or paste a GraphQL query into the provided text area.
2. **Upload a .graphql File**: You can upload a `.graphql` file containing your query, and it will be automatically loaded into the input area.
3. **Submit the Query**: Once the query is entered, click on the "Convert" button to send the query to the backend and get the JSON response.
4. **View the Response**: The response is displayed in a formatted JSON box. You can copy the JSON response or download it as a `.json` file using the provided buttons.

## Example Queries

### Example 1: Simple Query

`query { posts { id title content } }`

This will convert the query to the following JSON format:

`{ "query": { "posts": { "id": true, "title": true, "content": true } } }`

### Example 2: Query with Arguments

`query { posts(limit: 10, orderBy: "createdAt") { id title content } }`

This will convert the query to the following JSON format:

`{ "query": { "posts": { "__args": { "limit": 10, "orderBy": "createdAt" }, "id": true, "title": true, "content": true } } }`

### Example 3: Mutation

`mutation { updatePost(id: 123, title: "New Title") { id title } }`

This will convert the mutation to the following JSON format:

`{ "mutation": { "updatePost": { "__args": { "id": 123, "title": "New Title" }, "id": true, "title": true } } }`

## API Usage

The backend also exposes a GraphQL endpoint where you can interact with the GraphQL server directly.

GraphQL Endpoint: `http://localhost:4000/graphql`

You can send queries and mutations to this endpoint, and the server will respond accordingly.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request. Ensure your contributions follow the existing code style and that tests are added for any new functionality.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

For more information about GraphQL, check out the official [GraphQL Specification](https://spec.graphql.org/October2021/).

For more information on JSON Schema, refer to the [JSON Schema Documentation](https://json-schema.org/draft/2020-12/json-schema-core).
