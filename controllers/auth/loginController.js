import Joi from 'joi';
import User from './../../models/user';
import CustomErrorHandler from './../../services/CustomErrorHandler';
import JwtService from './../../services/JwtService';
import bcrypt from 'bcrypt';

const loginController ={

    async login (req, res, next) {


     
        const loginSchema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            

        })

        const {error} =loginSchema.validate(req.body);

       

        if(error) {
            return next(error);
        }

        try {
            const user = await User.findOne({where:{email:req.body.email}}).catch((err)=>{
                return next(err);
            })

            if(!user){
                return next(CustomErrorHandler.wrongCredentials());
            }

            const match = await  bcrypt.compare(req.body.password,user.password);

            if(!match){

                return next(CustomErrorHandler.wrongCredentials());

            }
            const access_token= JwtService.sign({id:user.user_id,role:user.role});

            res.json({access_token});

            //compare the password
          

        }catch(error) {
            return next(error);

        }

    }

}

export default loginController;