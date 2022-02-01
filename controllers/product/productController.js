import Joi from 'joi';
import { Product,ProductAttribute,Units,Category} from '../../models';
import productExperation from '../../models/productExperation';
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
            count_type:req.body.count_type,
            
           
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
    },
    async addProductExperations(req, res, next){

        let data ={
            date:req.body.date,
         
            table_name:req.body.count_type,
            track_id:req.body.track_id,
            
           
        }

        

        try{

            //await Product.create(product);
            const experationExist= await productExperation.findOne({where:{ track_id:req.body.track_id,table_name:req.body.count_type}});

            if(!experationExist){
                const newProductExperation = await productExperation.create(data).then((d) =>{
                    res.json(d)
                }).catch((err)=>{
                 
                    next(err);
                });

            }

            res.json({"message":"experation already exist"})

          }catch(err){
              next(err);
            }
        
    },

    async getProductExperation(req, res, next){
        res.json({"message":"all experation"})
    }



}

export default productController;