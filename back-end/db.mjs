import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema } = mongoose;

const userSchema = Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const itemSchema = Schema({
    title: String,  
    description: String,
    deadline: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);

export {
    User,
    Item
};