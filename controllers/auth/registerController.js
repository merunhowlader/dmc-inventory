import Joi from 'joi';

import { User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';

import bcrypt  from 'bcrypt';

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
            roll:Joi.string().optional(),
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

        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const {username,email,phone,department,password,roll} = req.body;
        const user ={
            username,
            email,
            password:hashedPassword,
            phone,
            department,
            roll,
           


        }
       
        console.log('we are before save block',user);
        try{
            const newUser = new User(user);
            const savedUser = await newUser.save().catch(err =>{
                next(err);
            });
            console.log('we are save block');
           if(savedUser) res.json({message:'thanks for registration'});

        }catch(err){
            next(err);

        }



        // res.json({msg:"hello for register controller"})

    }

}


export default registerController;