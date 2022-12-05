import Express from 'express';
import {getPostsByCreator,searchposts,getposts,createpost,getpost,updatepost,deletepost,likepost, commentPost} from '../controller/postcontroller.js'
import auth from '../middleware/authmiddleware.js';


const router=Express.Router();


router.post('/',auth,createpost);
router.get('/creator', getPostsByCreator);
router.get('/',getposts);
router.get('/:id',getpost);
router.get('/search/query',searchposts);

router.patch('/:id',auth, updatepost);

router.delete('/:id',auth, deletepost);
router.post('/:id/commentPost',commentPost);
router.patch('/:id/likepost',auth,likepost);



export default router;
