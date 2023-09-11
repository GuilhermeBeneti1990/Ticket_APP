import express from 'express';
import { currentUser } from '@beneti-tickets/common';

const router = express.Router();

router.get(
    '/api/users/currentUser', 
    currentUser,
    async (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };