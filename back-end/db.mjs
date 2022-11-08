import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const itemSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,  
    description: String,
    deadline: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);

export {
    User,
    Item
};