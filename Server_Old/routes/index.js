import express from 'express';
import session from 'express-session';
import cors from 'cors';

const router = express.Router();

import auth from './authentication'
import users from './users';
import articles from './articles';

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

router.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    credentials: true
}));

router.use('/auth', auth);
router.use('/users', users);
router.use('/articles', articles);

export default router;