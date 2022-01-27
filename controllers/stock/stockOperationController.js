import Joi, { date } from 'joi';
import { Product,Units,Location,LocationType,sequelize ,StockOpration,StockOperationItem,Inventory} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const stockOperationController ={
    
    async makeOutTransaction(req, res, next){
        res.json("hi");


     }

    ,
    async transfer(req, res, next){

        let allTransactionsItems=[...req.body.items];

        let transaction ={
            from:req.body.from,
            to:req.body.to,
            serial:req.body.serialNo,
            createdBy:'1',
            operationType:req.body.operationType,
        }

        try{

            const newOperation = await StockOpration.create(transaction).catch((err)=>{
                 
                next(err);
            });
        
            if(!newOperation){
                next(new Error(' fast transaction error'));
            }
            let allItem=[];
            let length=allTransactionsItems.length;

            for(let i=0; i<length;i++){
               let itemData={
                   product_id:allTransactionsItems[i].product_id,
                   quantity:allTransactionsItems[i].amount,
                   stockOperationId:newOperation.operation_Id
              
               }
               allItem.push(itemData);
            }
               const allitem=await StockOperationItem.bulkCreate(allItem).catch((err)=>{
                         next(err);
                })
               

            let promises = [];
            let i=0;
           

            for ( i; i<allTransactionsItems.length; i++) {

               

                    let checkFrom= await Inventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id: req.body.from}}).catch(err => {
                      
                        next(err);
                    })
                   

                    let checkTo= await Inventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id: req.body.to}}).catch(err => {
                        next(err);
                    })

                    console.log('this is check value' ,checkFrom);

                    if(checkFrom){
                        promises.push(Inventory.update({ quantity:  sequelize.literal(`quantity - ${allTransactionsItems[i].amount}`)},{ where: { product_id: allTransactionsItems[i].product_id,location_id: req.body.from} }));

                    }else{
                        promises.push( Inventory.create({ product_id: allTransactionsItems[i].product_id,location_id: req.body.from,quantity:-allTransactionsItems[i].amount}))

                    }
                    if(checkTo){
                        promises.push(Inventory.update({ quantity:  sequelize.literal(`quantity + ${allTransactionsItems[i].amount}`)},{ where: { product_id: allTransactionsItems[i].product_id,location_id: req.body.to} }));

                    }else{
                        promises.push( Inventory.create({ product_id: allTransactionsItems[i].product_id,location_id: req.body.to,quantity:allTransactionsItems[i].amount}))

                    }


                    

                
           }
     
           await Promise.all(promises).then((data) => {
                res.json("now theck this ,this time it might work");
            }).catch((err)=>{
                console.log(' error in promise')
                next(err);
            });

           console.log('merun kanti howlader',promises);

        }catch(err){
            next(new Error(' Somthing Wrong happen please Try aganin'));
        }

    },

    async stockOperation(req, res, next){
        try{

            const exist = await StockOpration.findAll({
                raw: true,
                include: {
                    model: StockOperationItem,
                    //raw: true,
                    include:
                            {
                                model: Product,
                                //attributes:['name'],
                                include: {
                                    model: Units,

                                },
                                
                                
                                required: false,     
                            },
                required: true,
               
                        
                    
                    
                }
            });

            if(!exist){
                res.json("transaction not found")
            }
            res.json(exist);

        }catch(err){
            next(err);
        }
    },

    async inventory(req, res, next){
        try{

            const exist = await  LocationType.findAll({
                raw: true,
                where: {name:'store'},
                include: [{
                    model: Location,
                  
                    raw: true,
                    include:
                            {
                                model: Inventory,
                                where: {location_id:2},
                                include: {
                                    model: Product,
                                    include: {
                                         model: Units,
                
                                         }
                                    
                                    
                                },
                                
                                //attributes:['name'],
                                
                                
                                required: true,     
                            },
                           
                        
                            
                        
                group: ['name'],
                required: true,
                    
                },
                // {
                //     model: Product,
                //     include: {
                //          model: Units,

                //          }
                    
                    
                // }
            
            
            ],
            
            });

            if(!exist){
                res.json("transaction not found")
            }
            res.json(exist);

        }catch(err){
            next(err);
        }
    }

   

}

export default stockOperationController;