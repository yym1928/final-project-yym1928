import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { User, Item } from "./db.mjs";
import router from './routes.mjs';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT_END_DOMAIN,
    method: 'GET, PUT, POST, DELETE',
    credentials: true
}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if(process.env.NODE_ENV === 'PRODUCTION') {
    mongoose.connect(`mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@class-mongodb.cims.nyu.edu/${process.env.DB_USER_NAME}`);
} else {
    mongoose.connect('mongodb://localhost/finalproject');
}

app.use('/', router);

app.listen(process.env.PORT || 5000); 
