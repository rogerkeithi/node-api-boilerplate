import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:4003", // Change this to match your API's base URL
      },
    ],
  },
  apis: ["../routes/*.ts"], // Point to where your API routes are defined
};

export default swaggerOptions;