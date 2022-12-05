import mongoose from 'mongoose';

const postschema=mongoose.Schema({
    title: String,//
    message: String,//
    creator: String,
    name:String,
    tags: [String],
    selectedFile: String,//
    comments: { type: [String], default: [] },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var allpost=mongoose.model('allpost',postschema);
export default allpost;