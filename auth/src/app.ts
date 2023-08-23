import express from 'express';
import 'express-async-errors';
import { json } from 'express';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/currentUser';
import { signupRouter } from './routes/signup';
import { singinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserRouter);
app.use(signupRouter);
app.use(singinRouter);
app.use(signoutRouter);

app.get('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };