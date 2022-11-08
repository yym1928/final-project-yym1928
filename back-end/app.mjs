import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { User, Item } from "./db.mjs";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

if(process.env.NODE_ENV === 'PRODUCTION') {
    mongoose.connect(`mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@class-mongodb.cims.nyu.edu/${process.env.DB_USER_NAME}`);
} else {
    mongoose.connect('mongodb://localhost/finalproject');
}

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.get('/get', (req, res) => {
    Item.aggregate([
        {
            $project: {
                title: 1,
                description: 1,
                deadline: { $dateToParts: { date: "$deadline" } }
            }
        }
    ]).exec((err, data) => {
        if(err) console.error(err);
        res.json(data);
    });
});

app.post('/set', (req, res) => {

    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline
    });

    newItem.save()
    .catch(err => console.error(err));

    res.send();
});

app.delete('/delete/:id', (req, res) => {
    Item.deleteOne( { "_id" : req.params.id } )
    .catch(err => console.error(err));
})

app.listen(process.env.PORT || 5000); 