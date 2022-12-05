import jwt from 'jsonwebtoken';

const secret = 'test';

const auth=async (req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];
        const iscustomauth=token.length<500;
        let decodeddata;
        if(token && iscustomauth){
            decodeddata=jwt.verify(token,secret);
            //console.log(decodeddata);*/
            req.userid=decodeddata?.id;
        }else{
            decodeddata=jwt.decode(token);
            //console.log(decodeddata);*/
            req.userid=decodeddata?.sub;
        }
        next();

    } catch (error) {
        console.log(error);
    }
}
export default auth;