import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth service",
      version: "1.0.0",
      description: "Microsservice documentation",
    },
    servers: [
      {
        url: "http://localhost:4002/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;