import express from 'express';
import 'express-async-errors';
import { json } from 'express';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@beneti-tickets/common';
import { createTicketRouter } from './routes/create';
import { findTicketRouder } from './routes/findById';
import { findAllTicketsRouter } from './routes/findAll';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(createTicketRouter);
app.use(findTicketRouder);
app.use(findAllTicketsRouter);
app.use(updateTicketRouter);

app.get('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };