import Joi from 'joi';
import { Product, StockLocation } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const productController ={
   async store(req, res, next){

    const productSchema = Joi.object({
        name: Joi.string().required(),
        type:Joi.string().required(),
        rental:Joi.string().required(),
        

    })

  

    const {error} = productSchema.validate(req.body);
   

    if(error){
        return next(error);
    }


    console.log('hi form product controller');

    try{

        const exist = await Product.findOne({where:{name:req.body.name}}).catch((err)=>{
            return next(err);
        })
      


        console.log('exist',exist);
         if(exist){
             return next(CustomErrorHandler.alreadyExist('this email is already taken'));
         }



        let stockLocation;
        let product ={
            name:req.body.name,
            type:req.body.type,
            rental:req.body.rental,
            department:req.user.department,
            created_by:req.user.user_id

        }
         try{
            

            

             const newProduct = await Product.create(product).then((data)=>{
                stockLocation= data.createStockLocation({
                    [req.user.department]:req.user.department,
                    }).catch((err)=>{
                        next(err);
                    })

             }).catch((err)=>{
                next(err);
            });

            if(newProduct){
                console.log(' stock location');

                stockLocation=await newProduct.createStockLocation({
                [req.user.department]:req.user.department
                }).catch((err)=>{
                    next(err);
                })
            }

            res.json({status: 'success'});


 
            

           

        }catch(err){
            next(err);

        }

        

    }catch(err){

        return next(err);

    }

   

    }
}

export default productController;