import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// This option specifies which origins are allowed to access your resources. Here, process.env.CORS_ORIGIN is an environment variable that should contain the allowed origin(s). For example, it could be set to 'http://example.com' to allow requests only from http://example.com, or it could be a wildcard ('*') to allow requests from any origin.

// credentials: true:
// This option tells the browser to include credentials such as cookies or authorization headers in the requests. When credentials is set to true, it means that the server will allow the client to send credentials (such as cookies or HTTP authentication).

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser()); // Call cookieParser as a function

import userRouter from './routes/user.routes.js';
// Routes declaration
app.use("/api/v1/users", userRouter);

app.get('/', (req, res) => {
  res.send("hello world");
});

export { app };
