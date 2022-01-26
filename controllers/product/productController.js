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

    async addProduct(req, res, next){

        let product ={
            name:req.body.name,
            description:req.body.description,
            unit_id:req.body.unit_id,
            quantity:req.body.quantity,
            
           
        }

        

        try{

            //await Product.create(product);

            const newProduct = await Product.create(product).catch((err)=>{
                 
                next(err);
            });
        
            if(!newProduct){
                next(new Error(' product error'));
            }


            
               if(newProduct){

                let attributes ={
                    color:req.body.color,
                    sku:req.body.sku,
                    created_by:req.body.created_by,
                    category_id:req.body.category_id,
                    product_id:newProduct.product_id,
                    notice:req.body.notice
                }

                const newAttribute = await ProductAttribute.create(attributes).catch((err)=>{
                     
                    next(err);
                });
                res.json('new product added')
               }
            

                
      
          }catch(err){
              next(err);
            }
        //res.json(" get all products");
    },

    async getAll(req, res, next){
        try{

            const exist = await Product.findAll(
                {
                raw: true,
                attributes: ['product_id', ['name', 'title']],
                include:[{
                       model: ProductAttribute,
                       
                       include:{
                        model: Category,
            
                        required: false,     
                         },
                
                       required: false, 

                },
                {
                    model: Units,
                    
                    attributes:['name'],
                  
                    required: false, 
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
    }
}

export default productController;