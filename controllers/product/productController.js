import Joi from 'joi';
import { Product,ProductAttribute,Units,Category,ProductExperation,ProductSerialised,ProductBatch} from '../../models';

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
    async addTrackingNumber(req, res, next){

        try{

            if(req.body.count_type===1){
                let data={
                    serial_number:req.body.track_id,
                    product_id:req.body.product_id,
                    location_id:req.body.to
                }

                const serialExist = await ProductSerialised.findOne({where:{serial_number:data.serial_number,product_id:data.product_id}}).catch((err)=>{
                 
                    next(err);
                });

                if(serialExist){
                    res.json({message:'serial already exist'})
                }else{
                    const newProductSerial = await ProductSerialised.create(data).catch((err)=>{
                     
                        next(err);
                    });

                    res.json({message:'product batch added successfully'})

                }



              

            }
            else if(req.body.count_type===2){
                let data={
                    batch_number:req.body.track_id,
                    product_id:req.body.product_id,
                    location_id:req.body.to,
                    quantity:req.body.quantity
                }

                const serialExist = await ProductBatch.findOne({where:{batch_number:data.batch_number,product_id:data.product_id,location_id:data.location_id}}).catch((err)=>{
                 
                    next(err);
                });

                if(serialExist){
                    res.json({message:'batch already exist'})
                }else{
                    const newProductBatch = await ProductBatch.create(data).catch((err)=>{
                     
                        next(err);
                    });
                    res.json({message:'product batch added successfully'})

                }



               

            }else{

                res.json({message:'something wrong happen '})

            }
            

        

        }catch(err){
            next(err);
          }
        
    },
    async addProductExperations(req, res, next){

        let table_name=(req.body.count_type===1) ? "productSerialised" : "productBatch"

        let data ={
            date:req.body.date,
         
            table_name:(req.body.count_type===1) ? "productSerialised" : "productBatch",
            track_id:req.body.track_id,
            
           
        }

        

        try{
              const newProductExperation = await ProductExperation.create(data).then((d) =>{
                    res.json(d)
                }).catch((err)=>{
                 
                    next(err);
                });

          

          }catch(err){
              next(err);
            }
        
    },

    async getProductExperation(req, res, next){

        try{
            const serialisedExperation = await ProductExperation.findAll({where:{table_name: 'productBatch'},include:{
                model: ProductSerialised,
                include:Product
             }});


             const BatchExperation = await ProductExperation.findAll({where:{table_name: 'productSerialised'},include:{
                model: ProductBatch,
                include:Product
             }});

             res.json({'seralised experation':serialisedExperation, 'batch experation':BatchExperation});
         
           

        }catch(err){
            next(err);
        }

        
      
    }



}

export default productController;