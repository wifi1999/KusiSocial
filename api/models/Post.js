const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String
    },
    like: {
        type: Array,
        default: []
    }
},
{ timestamps: true }
);

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;
