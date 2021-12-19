import Joi from 'joi';

import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';

import bcrypt  from 'bcrypt';

import JwtService from '../../services/JwtService';
import { REFRESH_SECRET } from '../../config';

const registerController={
  async  register(req, res, next){

        //validation
        const registerSchema = Joi.object({
            username: Joi.string().min(3).max(40).required(),
            email:Joi.string().email().required(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            conform_password:Joi.ref('password'),
            phone:Joi.string().min(10).max(14).required(),
            department:Joi.string().required(),
            role:Joi.string().optional(),
            status:Joi.boolean().optional(),

        })

      

        const {error} = registerSchema.validate(req.body);
       

        if(error){
            return next(error);
        }


        try{

            const exist = await User.findOne({where:{email:req.body.email}}).catch((err)=>{
                return next(err);
            })
          

   
            console.log('exist',exist);
             if(exist){
                 return next(CustomErrorHandler.alreadyExist('this email is already taken'));
             }

            

        }catch(err){

            return next(err);

        }
        console.log('test 2');

        const hashedPassword = await bcrypt.hash(req.body.password,10).catch((err)=>{
            next(err);
        });

        const {username,email,phone,department,password,role} = req.body;
        const user ={
            username,
            email,
            password:hashedPassword,
            phone,
            department,
            role,
           


        }
       
        console.log('we are before save block',user);
        let access_token;
        let refresh_token;
        try{
            const newUser = new User(user);
            const savedUser = await newUser.save().then((data)=>{
                access_token= JwtService.sign({id:data.user_id,role:data.role});
                refresh_token= JwtService.sign({id:data.user_id,role:data.role},'1y',REFRESH_SECRET);
                
              
                const savedRefreshToken =  RefreshToken.create({token:refresh_token}).catch((err)=>{
                    next(err);
                })
                 res.json({access_token:access_token,refresh_token});
            }).catch(err =>{
                next(err);
            });
            console.log('we are save block',savedUser.role);
            //JwtService.sign({id:result.id})
        //    if(savedUser){

        //     access_token= JwtService.sign({id:savedUser.user_id,role:savedUser.role})
        //     res.json({access_token:access_token});

        //    }

        }catch(err){
            next(err);

        }



         res.json({msg:"hello for register controller"})

    }

}


export default registerController;