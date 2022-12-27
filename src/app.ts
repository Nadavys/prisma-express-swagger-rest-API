import express, { Express, Request, Response } from 'express';
import userRoute from './routes/userRoute'
import postRoute from './routes/postRoute'
import cors from 'cors';

import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const app: Express = express();
app.use(express.json())
app.use(cors())

app.use('/users', userRoute);
app.use('/posts', postRoute);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API Documentation',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['**/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;