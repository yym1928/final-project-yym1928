import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { User, Item } from "./db.mjs";
const router = express.Router();

router.get('/get', (req, res) => {
    if(req.user) {
        User.aggregate([
            { $match: { _id: req.user._id } },
            { $unwind: "$items" },
            { $lookup: {
                from: "items",
                localField: "items",
                foreignField: "_id",
                as: "item_doc"
            }},
            {
                $sort : { "item_doc.deadline" : 1 }
            },
            {
                $project: {
                    _id: "$item_doc._id",
                    title: "$item_doc.title",
                    description: "$item_doc.description",
                    deadline: "$item_doc.deadline"
                }
            }
        ])
        .exec((err, data) => {
            if(err) console.log(err);
            res.json(data);
        });
    } else {
        res.status(401).send();
    }
});

router.get('/edit/:id', (req, res) => {
    if(req.user){
        Item.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    deadline: 1,
                }
            }
        ]).exec((err, data) => {
            if(err) console.log(err);
            res.json(data);
        })
    } else {
        res.status(401).send();
    }
})

router.post('/register', (req, res, next) => {
    User.register(new User({username: req.body.username}), req.body.password, (err) => {
        if(err) res.status(403).json(err);
        else {
            res.send();
        }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user.username);
});

router.post('/logout', (req, res, next) => {
    req.logOut((err) => {
        if(err) return next(err);
        res.send();
    });
})

router.post('/add', (req, res) => {
    if(req.user) {
        const newItem = new Item({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            user: req.user._id
        });

        newItem.save((err) => {
            if(err) console.log(err);
            User.updateOne({ _id: req.user._id }, { $push: { items: newItem._id} })
            .catch(err => console.log(err));
        })

        res.send();
    } else {
        res.status(401).send();
    }
});

router.put('/update/:id', (req, res) => {
    if(req.user) {
        Item.updateOne(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            { $set: { 
                title: req.body.title, 
                description: req.body.description,
                deadline: req.body.deadline
            } }
        ).exec((err, data) => {
            if(err) console.log(err);
            res.json(data);
        });
    } else {
        res.status(401).send();
    }
});

router.delete('/delete/:id', (req, res) => {
    if(req.user) {
        User.updateOne(
            { _id: req.user._id },
            { $pull: { items: mongoose.Types.ObjectId(req.params.id) } }
        ).then(
            Item.deleteOne( { "_id" : req.params.id } )
            .then(res.send())
            .catch(err => console.log(err))
        )
    } else {
        res.status(401).send();
    }
});

export default router;