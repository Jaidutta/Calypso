import express, { Express } from 'express';
import { userRouter } from './routers/user.router.js';
import { errorHandler } from './middlewares/error-handler.js';

const app: Express = express();

// app.use() is a middleware registration function
app.use(express.json()) // this will help express to deserialize the request body into JS object
app.use(express.text());  // accepts text
app.use(express.urlencoded())  // accepts urlEncoded data

// Custom Routes
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});


// Express Router based routes
app.use("/api/users", userRouter); // if the route starts with /users, userRouter will handle it



// after all the routes, at the very end, 
// this is where we mention our error-handling middleware
app.use(errorHandler)
export { app };