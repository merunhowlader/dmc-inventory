import Joi from 'joi';
import { Product,ProductAttribute,Units,Category} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const productController ={
   async store(req, res, next){
    try{

        const exist = await Product.findAll().catch((err)=>{
            return next(err);
        })
      
        res.json(exist);
        
  
      }catch(err){
          next(err);
        }
    //res.json("hi");



   

    },

    async getAll(req, res, next){
        try{

            const exist = await Product.findAll({
                include: {
                    model: ProductAttribute,
                    include:
                        [{
                            model: Category,
                
                            required: false,     
                        }, {
                            model: Units,
                            
                            attributes:['name'],
                          
                            required: false, 
                        }],
                        required: false,
                        
                    
                    
                }
            }).catch((err)=>{
                return next(err);
            })
          
            res.json(exist);
            
      
          }catch(err){
              next(err);
            }
        //res.json(" get all products");
    }
}

export default productController;