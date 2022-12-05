import allpost from '../models/postmodel.js';
import mongoose from 'mongoose';

export const getposts=async (req,res)=>{
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await allpost.countDocuments({});
        const posts = await allpost.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        
        //const allposts=await allpost.find();
        //res.status(200).json(allposts);
    } catch (error) {
        res.status(404).json(error);
    }

}
export const getpost=async (req,res)=>{
    const {id}=req.params;
    try {
        
        const post=await allpost.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json(error); 
    }

}

export const searchposts = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await allpost.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const createpost=async (req,res)=>{
    const post=req.body;
    const newpost=new allpost({...post,creator:req.userid,createdAt:new Date().toISOString() });
    try {
        await newpost.save();
        res.status(200).json(newpost);
    } catch (error) {
        res.status(404).json(error);        
    }
}

export const updatepost=async (req,res)=>{
    const {id}=req.params;
    const {title,message,selectedFile,creator,tags}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`no post with that id:${id}`);
    const updatednewpost={title,message,selectedFile,creator,tags,_id:id};
    try {
        await allpost.findByIdAndUpdate(id,updatednewpost,{new:true});
        res.status(200).json(updatednewpost);
    } catch (error) {
        res.status(404).json(error);        
    }

}

export const deletepost=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`no post with that id:${id}`);
    try {
        await allpost.findByIdAndRemove(id);
        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(404).json(error);        
    }
}

export const likepost=async (req,res)=>{
    const {id}=req.params;

    if(!req.userid) return res.json({message:"unauthorized"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`no post with that id:${id}`);
    try {
        const post=await allpost.findById(id);
        const index=post.likes.findIndex((id)=>id===String(req.userid));
        if(index===-1){
            post.likes.push(req.userid);
        }else{
            post.likes=post.likes.filter((id)=>id!==String(req.userid));
        }
        const updatednewpost=await allpost.findByIdAndUpdate(id,post,{ new: true });
        res.json(updatednewpost);
    } catch (error) {
        res.status(404).json(error);        
    }
}



export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const post = await allpost.findById(id);
    post.comments.push(value);
    const updatedPost = await allpost.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
};

export const getPostsByCreator = async (req, res) => {
    var { name } = req.query;
    try {
        const posts = await allpost.find({ name });
        
        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}