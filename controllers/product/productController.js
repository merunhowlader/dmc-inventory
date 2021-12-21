import Joi from 'joi';
import { Product, StockLocation } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const productController ={
   async store(req, res, next){

    const productSchema = Joi.object({
        name: Joi.string().required(),
        type:Joi.string().required(),
        rental:Joi.string().required(),
        notice:Joi.number().required(),
        

    })

  

    const {error} = productSchema.validate(req.body);
   

    if(error){
        return next(error);
    }


    console.log('hi form product controller',req.user.user_id);

    try{

        const exist = await Product.findOne({where:{name:req.body.name}}).catch((err)=>{
            return next(err);
        })
      


        console.log('exist',exist);
         if(exist){
             return next(CustomErrorHandler.alreadyExist('product alrady exist'));
         }



        let stockLocation;
        let product ={
            name:req.body.name,
            type:req.body.type,
            department:req.user.department,
            rental:req.body.rental,
            notice:req.body.notice,
           
            created_by:req.user.id

        }
         try{
            

            

             const newProduct = await Product.create(product).then((data)=>{
                stockLocation= data.createStockLocation({
                    [req.user.department]:0,
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