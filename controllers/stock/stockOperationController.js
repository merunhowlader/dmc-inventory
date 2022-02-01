import Joi, { date } from 'joi';
import { Product,Units,Location,LocationType,sequelize ,StockOpration,StockOperationItem,Inventory,LoanInventory,ProductSerialised,ProductBatch} from '../../models';
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
            reference:req.body.reference,
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
           

            for ( i; i < allTransactionsItems.length ; i++) {


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
    async loan(req, res, next){

        let allTransactionsItems=[...req.body.items];

        let transaction ={
            from:req.body.from,
            to:req.body.to,
            reference:req.body.reference,
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
            
            let AllSerialNumber=[];
            let AllBatch=[];
            let AllExixtBatch=[];

     

            for(let i=0; i<length;i++){
               let itemData={
                   product_id:allTransactionsItems[i].product_id,
                   quantity:allTransactionsItems[i].amount,
                   stockOperationId:newOperation.operation_Id
              
               }
               allItem.push(itemData);
               
            //    console.log('item data');
            //    if(allTransactionsItems[i].count_type===2){
                 
            //      //let itemBatch =allTransactionsItems[i].track_number;
            //      let itemBatch=allTransactionsItems[i].track_number.map(o => o.batch);
            //     AllExixtBatch.push(...itemBatch);
            //     console.log(i,AllExixtBatch);
            //    }

             
            }


            const allitem=await StockOperationItem.bulkCreate(allItem).catch((err)=>{
                         next(err);
                })

            
               

            let promises = [];
            let i=0;
           

            for ( i; i < allTransactionsItems.length ; i++) {


                    let checkFrom= await Inventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id: req.body.from}}).catch(err => {
                        
                        next(err);

                    })

                    let checkTo= await Inventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id: req.body.to}}).catch(err => {
                        next(err);
                    })

                    let checkLoan= await LoanInventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id_from: req.body.from,location_id_to: req.body.to}}).catch(err => {
                
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





                    if(checkLoan){
                        promises.push(LoanInventory.update({ quantity:  sequelize.literal(`quantity + ${allTransactionsItems[i].amount}`)},{ where: { product_id: allTransactionsItems[i].product_id,location_id_from: req.body.from} }));

                    }else{
                        promises.push( LoanInventory.create({ product_id: allTransactionsItems[i].product_id,location_id_from: req.body.from,location_id_to: req.body.to,quantity:allTransactionsItems[i].amount}))

                    }

                    console.log('merun');


                    if(allTransactionsItems[i].count_type===1){
                        let trackItemsLength=allTransactionsItems[i].track_number.length;

                        console.log(trackItemsLength);
                          
                         for (let j =0 ; j<trackItemsLength ; j++){
                             console.log('in loop');
                         promises.push(ProductSerialised.update({ location_id:req.body.to},{ where: { serial_number: allTransactionsItems[i].track_number[j], product_id: allTransactionsItems[i].product_id,location_id:req.body.from}}));
                         }
                     
                     }
                    //  else if(allTransactionsItems[i].count_type===2){
                    //      let trackItemsLength=allTransactionsItems[i].track_number.length;
                          
                    //      for (let j =0 ; j<trackItemsLength ; j++){
                    //          console.log('in loop',j);
                    //      promises.push(ProductBatch.create({ batch_number:allTransactionsItems[i].track_number[j].batch, product_id: allTransactionsItems[i].product_id,location_id:req.body.to,quantity:allTransactionsItems[i].track_number[j].quantity}));
                    //      }
 
                    //  }


                    

                
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
    async supply(req, res, next){

        let allTransactionsItems=[...req.body.items];

        let transaction ={
            from:req.body.from,
            to:req.body.to,
            reference:req.body.reference,
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
           

            for ( i; i < allTransactionsItems.length ; i++) {

                  
                   

                    let checkTo= await Inventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id: req.body.to}}).catch(err => {
                        next(err);
                    })

                   

                    if(checkTo){
                        promises.push(Inventory.update({ quantity:  sequelize.literal(`quantity + ${allTransactionsItems[i].amount}`)},{ where: { product_id: allTransactionsItems[i].product_id,location_id: req.body.to} }));

                    }else{
                        promises.push( Inventory.create({ product_id: allTransactionsItems[i].product_id,location_id: req.body.to,quantity:allTransactionsItems[i].amount}))

                    }

                    if(allTransactionsItems[i].count_type===1){
                       let trackItemsLength=allTransactionsItems[i].track_number.length;
                         
                        for (let j =0 ; j<trackItemsLength ; j++){
                            console.log('in loop');
                        promises.push(ProductSerialised.create({ serial_number:allTransactionsItems[i].track_number[j], product_id: allTransactionsItems[i].product_id,location_id:req.body.to}));
                        }
                    
                    }
                    else if(allTransactionsItems[i].count_type===2){
                        let trackItemsLength=allTransactionsItems[i].track_number.length;
                         
                        for (let j =0 ; j<trackItemsLength ; j++){
                            console.log('in loop',j);
                        promises.push(ProductBatch.create({ batch_number:allTransactionsItems[i].track_number[j].batch, product_id: allTransactionsItems[i].product_id,location_id:req.body.to,quantity:allTransactionsItems[i].track_number[j].quantity}));
                        }

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
                include:[ {
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
                    required: false,
                
                },{

                    model:Location,
                    attributes:['name'],
                    as:'From'
                    
                    
                },{

                    model:Location,
                    attributes:['name'],
                    as:'To'
                    
                    
                }]
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

        console.log("all inventory ");
        try{

            const exist = await Inventory.findAll({
                raw: true,
                attributes: [['quantity','amount']],
                include: [{
                    model: Location ,
                    attributes: ['name'],
                   // where: {location_id:2},
                    raw: true,
                    include:
                            {
                                model: LocationType,
                                attributes: ['name'],
                              
                                // include: {
                                //     model: Product,
                                //     include: {
                                //          model: Units,
                
                                //          }
                                    
                                    
                                // },
                                
                                //attributes:['name'],
                                
                                
                                required: false,     
                            },
                           
                        
                            
                        
                group: ['name'],
                required: false,
                    
                },
                {
                    model: Product,
                    attributes: ['name'],
                    include: {
                         model: Units,
                         attributes: ['name']

                         }
                    
                    
                }
            
            
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