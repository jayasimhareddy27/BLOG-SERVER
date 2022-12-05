import Express from 'express';
import {signin,signup} from './../controller/usercontroller.js'

const router=Express.Router();


router.post('/signin',signin);
router.post('/signup',signup);

export default router;