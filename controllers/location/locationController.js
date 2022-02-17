import Joi, { date } from 'joi';
import { Product,Units,Location,LocationType,sequelize ,Sequelize,StockOpration,StockOperationItem,Inventory,RelatedOperation,LoanInventory,ProductSerialised,ProductBatch} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';

//const { Op } = sequelize;
const { Op } = Sequelize;

const locationController ={

    async getAll(req, res, next){
        console.log(' location route')
        try{

            const exist = await Location.findAll(
                {
               
               
                include:[{
                       model: LocationType,
                       
                       attributes: ['name'],
                
                       required: true, 

                }
            
            
            ],
                
                required: false,
                
                
            }).catch((err)=>{
                return next(err);
            })
          
            res.json(exist);
            
      
          }catch(err){
              next(err);
            }
        //res.json(" get all products");
    },
    async addNewLocation(req, res, next){

        try{
            
            const exist = await Location.findOne({where:{name:req.body.name,type:req.body.type}}).catch((err)=>{
                return next(err);
            })
          

   
            console.log('exist',exist);
             if(exist){
                 return next(CustomErrorHandler.alreadyExist('this email is already taken'));
             }


        }catch(err){
            next(err);
        }
    }
        // const locationSchema = Joi.object({
        //     name: Joi.string().min(3).max(40).required(),
        //     type:Joi.integer().required(),
        //     isSub:Joi.boolean().required(),
            

        // })

      

        // const {error} = locationSchema.validate(req.body);
       

        // if(error){
        //     return next(error);
        // }


    //     try{

    //         const exist = await Location.findOne({where:{name:req.body.name,type:req.body.type}}).catch((err)=>{
    //             return next(err);
    //         })
          

   
    //         console.log('exist',exist);
    //          if(exist){
    //              return next(CustomErrorHandler.alreadyExist('this email is already taken'));
    //          }

            

    //     }catch(err){

    //         return next(err);

    //     }
    //     console.log('test 2');

    //     const hashedPassword = await bcrypt.hash(req.body.password,10).catch((err)=>{
    //         next(err);
    //     });

    //     const {username,email,phone,department,password,role} = req.body;
    //     const user ={
    //         username,
    //         email,
    //         password:hashedPassword,
    //         phone,
    //         department,
    //         role,
           


    //     }
       
    //     // console.log('we are before save block',user);
    //     let access_token;
    //     let refresh_token;
    //     try{
    //         const newUser = new User(user);
    //         const savedUser = await newUser.save().catch(err =>{
           
    //             next(err);
    //         });

    //         if(savedUser){

    //             access_token= JwtService.sign({id:user.user_id,role:user.role,department:user.department});

    //             refresh_token= JwtService.sign({id:user.user_id,role:user.role,department:user.department},'1y',REFRESH_SECRET);

    //             console.log(' newly asign refresh token ',refresh_token);
    //          const savedRefreshToken = await RefreshToken.create({token:refresh_token}).then((data)=>{
    
    //                 res.json({access_token:access_token,refresh_token});
                  
    
                   
    
    //             }).catch((err)=>{
    //                 next(err);
    //             });
    

    //         }

           
          
    //         // if(savedRefreshToken.token){
    //         //     res.json({access_token:access_token,refresh_token});

    //         // }

            

            
            
    //         //JwtService.sign({id:result.id})
    //     //    if(savedUser){

    //     //     access_token= JwtService.sign({id:savedUser.user_id,role:savedUser.role})
    //     //     res.json({access_token:access_token});

    //     //    }

    //     }catch(err){
    //         next(err);

    //     }
    // },

}


export default locationController;