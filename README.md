# Node API boilerplate

This is a boilerplate for building a TypeScript-based Node.js application structured in microservices, following the Clean Architecture pattern and the practices of Clean Code and SOLID.


## Running Locally 

On that project, we're using docker compose to run our stack locally, so you have to install docker on your machine.

### Clone the project

```bash
  git clone https://github.com/rogerkeithi/node-api-boilerplate
```

### Enter the project directory

```bash
  cd node-api-boilerplate
```

### Setup to develop

Run this command to setup local packages and install all packages of each service:

```bash
  npm run setup
```

### Build and start

```bash
  docker compose up --build
```
Running this command will rebuild and start all services in our project. 

### Swagger

To access swagger pages of each microservice, just enter 'api-docs' on the URL service.

Example (Running locally):
- http://localhost:4001/api-docs/ = user service
- http://localhost:4002/api-docs/ = auth service
