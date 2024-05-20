const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

module.exports = (app) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Teacher Daily Record and Timetable API',
        version: '1.0.0',
        description: 'API documentation for the Teacher Daily Record and Timetable application',
      },
      servers: [
        {
          url: 'http://localhost:10000',
          description: 'Development server',
        },
      ],
      security: [
        {
          JWTAuth: [],
        },
      ],
      components: {
        securitySchemes: {
          JWTAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./routes/*.js'], // Path to the API routes
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
