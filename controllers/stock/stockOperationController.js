import Joi, { date } from 'joi';
import { Product,Units,Location,LocationType,sequelize ,Sequelize,StockOpration,StockOperationItem,Inventory,RelatedOperation,LoanInventory,ProductSerialised,ProductBatch} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';

//const { Op } = sequelize;
const { Op } = Sequelize;

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
            let AllExixtBatchTo=[];

            for(let i=0; i<length;i++){
               let itemData={
                   product_id:allTransactionsItems[i].product_id,
                   quantity:allTransactionsItems[i].amount,
                   stockOperationId:newOperation.operation_Id
               }
               allItem.push(itemData);

               if(allTransactionsItems[i].count_type===2){
                 
                let itemBatch =allTransactionsItems[i].track_data;
                const asyncRes = await Promise.all(itemBatch.map(async (d) => {
                const checkDataExistTo=await ProductBatch.findOne({where:{batch_number:d.track_id,location_id:req.body.to}}).catch((err)=>{
                                       next(err);
                           })
                    return checkDataExistTo;
                   }));
               AllExixtBatchTo.push({index:i,array:asyncRes});    
                 
              }
            }

      
               const allitem=await StockOperationItem.bulkCreate(allItem).catch((err)=>{
                         next(err);
                }) 
            let promises = [];
            let i=0;


            // let related_exist =await RelatedOperation.findOne({react_id:newOperation.operation_Id},{where:{id:req.body.related_operation_id}} ).catch((err)=>{
            //     next(err);
            //   })    

            console.log(req.body.related_operation_id);
            if(req.body.related_operation_id){
                console.log('merun ckeck this id',req.body.related_operation_id,newOperation);
                    const newRelatedOperation=await RelatedOperation.update({react_id:newOperation.operation_Id},{where:{act_id:req.body.related_operation_id,react_id:{[Op.is]: null }}} ).catch((err)=>{
                        next(err);
                      })
                    console.log(newRelatedOperation);
            } 
           

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

                   if(allTransactionsItems[i].count_type===1){
                        let trackItemsLength=allTransactionsItems[i].track_data.length;
                         for (let j =0 ; j<trackItemsLength ; j++){

                            console.log('seerail numbers',allTransactionsItems[i].track_data[j].track_id);
                         

                          promises.push(ProductSerialised.update({ location_id:req.body.to},{ where: { serial_number: allTransactionsItems[i].track_data[j].track_id, product_id: allTransactionsItems[i].product_id,location_id:req.body.from}}));
                         
                        
                        }
                     
                     }   
           }



          for(let i=0; i<AllExixtBatchTo.length; i++){
         
              let index=AllExixtBatchTo[i].index;
              for(let j=0; j<AllExixtBatchTo[i].array.length ; j++){
                let exist=AllExixtBatchTo[i].array[j];
                let batchNumber=allTransactionsItems[index].track_data[j].track_id;
                let quantity=  allTransactionsItems[index].track_data[j].quantity ;
                let productId= allTransactionsItems[index].product_id;
                let locationIdTo=req.body.to;
                let locationIdFrom=req.body.from;
                
                 if(exist){   
                     promises.push(ProductBatch.update({ quantity:sequelize.literal(`quantity + ${quantity}`)},{where:{batch_number:batchNumber, product_id: productId,location_id:locationIdTo}}))
        
                 }       
                 else{
                    promises.push(ProductBatch.create({ batch_number: batchNumber, product_id: productId,location_id:locationIdTo,quantity:quantity})); 
                 }

                 promises.push(ProductBatch.update({ quantity:sequelize.literal(`quantity - ${quantity}`)},{where:{batch_number:batchNumber, product_id: productId,location_id:locationIdFrom}}))

                

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
            let AllExixtBatchTo=[];

            let AllExistSerialTo=[];
           

     

            for(let i=0; i<length;i++){
               let itemData={
                   product_id:allTransactionsItems[i].product_id,
                   quantity:allTransactionsItems[i].amount,
                   stockOperationId:newOperation.operation_Id
              
               }
               allItem.push(itemData);
               

               if(allTransactionsItems[i].count_type===2){
                 
                let itemBatch =allTransactionsItems[i].track_data;
               const asyncRes = await Promise.all(itemBatch.map(async (d) => {
                   const checkDataExistTo=await ProductBatch.findOne({where:{batch_number:d.track_id,location_id:req.body.to}}).catch((err)=>{
                                       next(err);
                           })
                
                    return checkDataExistTo;

                   }));
               AllExixtBatchTo.push({index:i,array:asyncRes});    
                 
              }

              if(allTransactionsItems[i].count_type===1){
                 
                let itemSerial =allTransactionsItems[i].track_data;

                const asyncSerialRes = await Promise.all(itemSerial.map(async (d) => {
                    const checkDataExistTo=await ProductSerialised.findOne({where:{serial_number:d.track_id}}).catch((err)=>{
                                        next(err);
                            })
                 
                     return checkDataExistTo;
 
                    }));
                AllExistSerialTo.push({index:i,array:asyncSerialRes});   
              
                 
              }
            }
            console.log(allItem);
            const allitem=await StockOperationItem.bulkCreate(allItem).catch((err)=>{
                         next(err);
                });

            if(req.body.related_operation_id){
                
                    const newRelatedOperation=await RelatedOperation.update({react_id:newOperation.operation_Id},{where:{id:req.body.related_operation_id,react_id:{[Op.is]: null }}} ).catch((err)=>{
                        next(err);
                      })
                    console.log(newRelatedOperation);
            } 

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

       


                    // if(allTransactionsItems[i].count_type===1){
                    //     let trackItemsLength=allTransactionsItems[i].track_data.length;

                          
                    //      for (let j =0 ; j<trackItemsLength ; j++){

                    //         console.log('seerail numbers',allTransactionsItems[i].track_data[j].track_id);
                         

                    //       promises.push(ProductSerialised.update({ location_id:req.body.to},{ where: { serial_number: allTransactionsItems[i].track_data[j].track_id, product_id: allTransactionsItems[i].product_id,location_id:req.body.from}}));
                         
                        
                    //     }
                     
                    //  }
                
                }


                for(let i=0; i<AllExistSerialTo.length; i++){
           
                    let index=AllExistSerialTo[i].index;
  
  
                    for(let j=0; j<AllExistSerialTo[i].array.length ; j++){
                          let exist=AllExistSerialTo[i].array[j];
              
                          let serialNumber=allTransactionsItems[index].track_data[j].track_id;
                      
                          let productId= allTransactionsItems[index].product_id;
                          let locationIdTo=req.body.to;
                          let locationIdFrom=req.body.from;
                          
                          if(exist){   
                              promises.push(ProductSerialised.update({ location_id:locationIdTo},{where:{serial_number:serialNumber }}))
                  
                          }       
                          else{
                              promises.push(ProductSerialised.create({ serial_number: serialNumber, product_id: productId,location_id:locationIdTo})); 
                          }
      
                    }
      
                }


          for(let i=0; i<AllExixtBatchTo.length; i++){

              let index=AllExixtBatchTo[i].index;
              for(let j=0; j<AllExixtBatchTo[i].array.length ; j++){
                let exist=AllExixtBatchTo[i].array[j];
                let batchNumber=allTransactionsItems[index].track_data[j].track_id;
                let quantity=  allTransactionsItems[index].track_data[j].quantity ;
                let productId= allTransactionsItems[index].product_id;
                let locationIdTo=req.body.to;
                let locationIdFrom=req.body.from;
                
                 if(exist){   
                     promises.push(ProductBatch.update({ quantity:sequelize.literal(`quantity + ${quantity}`)},{where:{batch_number:batchNumber, product_id: productId,location_id:locationIdTo}}))
        
                 }       
                 else{
                    promises.push(ProductBatch.create({ batch_number: batchNumber, product_id: productId,location_id:locationIdTo,quantity:quantity})); 
                 }

                 promises.push(ProductBatch.update({ quantity:sequelize.literal(`quantity - ${quantity}`)},{where:{batch_number:batchNumber, product_id: productId,location_id:locationIdFrom}}))

                

              }

          }

        

   


    
     
           await Promise.all(promises).then((data) => {
                res.json("your transaction was successful");
            }).catch((err)=>{
                console.log(' error in promise')
                next(err);
            });

           console.log('merun kanti howlader',promises);

        }catch(err){
            next(new Error(' Somthing Wrong happen please Try aganin'));
        }

    },

    async loanReturn(req, res, next){

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
            let AllBatchindex=[];
            let AllExixtBatchTo=[];
            let AllExixtBatchFrom=[];

     

            for(let i=0; i<length;i++){
               let itemData={
                   product_id:allTransactionsItems[i].product_id,
                   quantity:allTransactionsItems[i].amount,
                   stockOperationId:newOperation.operation_Id
              
               }
               allItem.push(itemData);
               

               if(allTransactionsItems[i].count_type===2){
                 
                 let itemBatch =allTransactionsItems[i].track_data;
                const asyncRes = await Promise.all(itemBatch.map(async (d) => {
                    const checkDataExistTo=await ProductBatch.findOne({where:{batch_number:d.track_id,location_id:req.body.to}}).catch((err)=>{
                                        next(err);
                            })
                 
                     return checkDataExistTo;

                    }));
                AllExixtBatchTo.push({index:i,array:asyncRes});    
                  
               }

     


             
            }


            const allitem=await StockOperationItem.bulkCreate(allItem).catch((err)=>{
                         next(err);
                });


            // let related_exist =await RelatedOperation.findOne({react_id:newOperation.operation_Id},{where:{id:req.body.related_operation_id}} ).catch((err)=>{
            //     next(err);
            //   })
                
            if(req.body.related_operation_id){
                console.log('merun ckeck this id',req.body.related_operation_id,newOperation);
                    const newRelatedOperation=await RelatedOperation.update({react_id:newOperation.operation_Id},{where:{id:req.body.related_operation_id,react_id:{[Op.is]: null }}} ).catch((err)=>{
                        next(err);
                      })
        
                    console.log(newRelatedOperation);


                  }



            
               

            let promises = [];
            let i=0;
           

            for ( i; i < allTransactionsItems.length ; i++) {


                    let checkFrom= await Inventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id: req.body.from}}).catch(err => {
                        
                        next(err);

                    })

                    let checkTo= await Inventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id: req.body.to}}).catch(err => {
                        next(err);
                    })

                    let checkLoan= await LoanInventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id_from: req.body.to,location_id_to: req.body.from}}).catch(err => {
                
                        next(err);
        
                    })


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
                        promises.push(LoanInventory.update({ quantity:  sequelize.literal(`quantity - ${allTransactionsItems[i].amount}`)},{ where: { product_id: allTransactionsItems[i].product_id,location_id_from: req.body.to,location_id_to: req.body.from} }));

                    }else{
                        promises.push( LoanInventory.create({ product_id: allTransactionsItems[i].product_id,location_id_from: req.body.from,location_id_to: req.body.to,quantity:allTransactionsItems[i].amount}))

                    }

       


                    if(allTransactionsItems[i].count_type===1){
                        let trackItemsLength=allTransactionsItems[i].track_data.length;

                          
                         for (let j =0 ; j<trackItemsLength ; j++){

                            console.log('seerail numbers',allTransactionsItems[i].track_data[j].track_id);
                         

                          promises.push(ProductSerialised.update({ location_id:req.body.to},{ where: { serial_number: allTransactionsItems[i].track_data[j].track_id, product_id: allTransactionsItems[i].product_id,location_id:req.body.from}}));
                         
                        
                        }
                     
                     }
                
                }


          for(let i=0; i<AllExixtBatchTo.length; i++){
            //   console.log('i',i);
            //   console.log(AllExixtBatchTo);
            //   console.log(AllExixtBatchTo[i].index);
            //   console.log(AllExixtBatchTo[i].array);
              let index=AllExixtBatchTo[i].index;
              for(let j=0; j<AllExixtBatchTo[i].array.length ; j++){
                let exist=AllExixtBatchTo[i].array[j];
                //console.log(exist);
                let batchNumber=allTransactionsItems[index].track_data[j].track_id;
                let quantity=  allTransactionsItems[index].track_data[j].quantity ;
                let productId= allTransactionsItems[index].product_id;
                let locationIdTo=req.body.to;
                let locationIdFrom=req.body.from;
                
                 if(exist){   
                     promises.push(ProductBatch.update({ quantity:sequelize.literal(`quantity + ${quantity}`)},{where:{batch_number:batchNumber, product_id: productId,location_id:locationIdTo}}))
        
                 }       
                 else{
                    promises.push(ProductBatch.create({ batch_number: batchNumber, product_id: productId,location_id:locationIdTo,quantity:quantity})); 
                 }

                 promises.push(ProductBatch.update({ quantity:sequelize.literal(`quantity - ${quantity}`)},{where:{batch_number:batchNumber, product_id: productId,location_id:locationIdFrom}}))

                

              }

          }

        

   


    
     
           await Promise.all(promises).then((data) => {
                res.json("now check this ,this time it might work");
            }).catch((err)=>{
                console.log(' error in promise')
                next(err);
            });

           console.log('merun kanti howlader',promises);

        }catch(err){
            next(new Error(' Somthing Wrong happen please Try aganin'));
        }

    },
    async demand(req, res, next){

        let allTransactionsItems=[...req.body.items];

        let userId=1;

        let transaction ={
            from:req.body.from,
            to:req.body.to,
            reference:req.body.reference,
            createdBy:userId,
            operationType:req.body.operationType,
        }
        try{
            const newOperation = await StockOpration.create(transaction).catch((err)=>{
                next(err);
            });

            let allItem=[];
        
            if(!newOperation){
                next(new Error(' fast transaction error'));
            }
          
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

               

                 const newRelatedOperation=await RelatedOperation.create({act_id:newOperation.operation_Id,demand_operation:transaction.operationType}).catch((err)=>{
                    next(err);
                  })



                 res.json({'hel':`your demand operation id ${newRelatedOperation.id} .please node the id for notification`});
 
  

     

        }catch(err){

        }

    },
    
    async supply(req, res, next){
        console.log(req.body);
        //next('new error');
        //res.json(req.body);

         let allTransactionsItems=[...req.body.items];
         console.log('all items data check',allTransactionsItems);

        let transaction ={
            from:req.body.from,
            to:req.body.to,
            reference:req.body.reference,
            createdBy:'1',
            operationType:"supply",
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
            let AllExixtBatchTo=[];

            let AllExistSerialTo=[];
  

            for(let i=0; i<length;i++){
               let itemData={
                   product_id:allTransactionsItems[i].product_id,
                   quantity:allTransactionsItems[i].amount,
                   stockOperationId:newOperation.operation_Id
              
               }
               allItem.push(itemData);


               if(allTransactionsItems[i].count_type===2){
                 
                let itemBatch =allTransactionsItems[i].track_data;
               const asyncRes = await Promise.all(itemBatch.map(async (d) => {
                   const checkDataExistTo=await ProductBatch.findOne({where:{batch_number:d.track_id}}).catch((err)=>{
                                       next(err);
                           })
                
                    return checkDataExistTo;

                   }));
               AllExixtBatchTo.push({index:i,array:asyncRes});    
                 
              }

              if(allTransactionsItems[i].count_type===1){
                 
                let itemSerial =allTransactionsItems[i].track_data;

                const asyncSerialRes = await Promise.all(itemSerial.map(async (d) => {
                    const checkDataExistTo=await ProductSerialised.findOne({where:{serial_number:d.track_id}}).catch((err)=>{
                                        next(err);
                            })
                 
                     return checkDataExistTo;
 
                    }));
                AllExistSerialTo.push({index:i,array:asyncSerialRes});   
              
                 
              }
            }
               const allitem=await StockOperationItem.bulkCreate(allItem).catch((err)=>{
                         next(err);
                })
               

            let promises = [];
            let i=0;

            console.log('serali bulk data',AllExistSerialTo);

               

            
           

            for ( i; i < allTransactionsItems.length ; i++) {

                    let checkTo= await Inventory.findOne({where:{ product_id: allTransactionsItems[i].product_id,location_id: req.body.to}}).catch(err => {
                        next(err);
                        })

                   

                    if(checkTo){
                        promises.push(Inventory.update({ quantity:  sequelize.literal(`quantity + ${allTransactionsItems[i].amount}`)},{ where: { product_id: allTransactionsItems[i].product_id,location_id: req.body.to} }));

                    }else{
                        promises.push( Inventory.create({ product_id: allTransactionsItems[i].product_id,location_id: req.body.to,quantity:allTransactionsItems[i].amount}))

                    }

                    // if(allTransactionsItems[i].count_type===1){
                    //    let trackItemsLength=allTransactionsItems[i].track_data.length;
                         
                    //     for (let j =0 ; j<trackItemsLength ; j++){
                    //         console.log('in loop');
                    //     promises.push(ProductSerialised.create({ serial_number:allTransactionsItems[i].track_data[j].track_id, product_id: allTransactionsItems[i].product_id,location_id:req.body.to}));
                    //     }
                    
                    // }
                    // else if(allTransactionsItems[i].count_type===2){
                    //     let trackItemsLength=allTransactionsItems[i].track_data.length;
                         
                    //     for (let j =0 ; j<trackItemsLength ; j++){
                    //         console.log('in loop',j);
                    //     promises.push(ProductBatch.create({ batch_number:allTransactionsItems[i].track_data[j].batch, product_id: allTransactionsItems[i].product_id,location_id:req.body.to,quantity:allTransactionsItems[i].track_data[j].quantity}));
                    //     }

                    // }


                  

                


                    

                
             }



             for(let i=0; i<AllExistSerialTo.length; i++){
           
                  let index=AllExistSerialTo[i].index;


                  for(let j=0; j<AllExistSerialTo[i].array.length ; j++){
                        let exist=AllExistSerialTo[i].array[j];
            
                        let serialNumber=allTransactionsItems[index].track_data[j].track_id;
                    
                        let productId= allTransactionsItems[index].product_id;
                        let locationIdTo=req.body.to;
                        let locationIdFrom=req.body.from;
                        
                        if(exist){   
                            promises.push(ProductSerialised.update({ location_id:locationIdTo},{where:{serial_number:serialNumber }}))
                
                        }       
                        else{
                            promises.push(ProductSerialised.create({ serial_number: serialNumber, product_id: productId,location_id:locationIdTo})); 
                        }
    
                  }
    
              }

          

            


          for(let i=0; i<AllExixtBatchTo.length; i++){
            //   console.log('i',i);
            //   console.log(AllExixtBatchTo);
            //   console.log(AllExixtBatchTo[i].index);
            //   console.log(AllExixtBatchTo[i].array);
              let index=AllExixtBatchTo[i].index;
              for(let j=0; j<AllExixtBatchTo[i].array.length ; j++){
                let exist=AllExixtBatchTo[i].array[j];
                //console.log(exist);
                let batchNumber=allTransactionsItems[index].track_data[j].track_id;
                let quantity=  allTransactionsItems[index].track_data[j].quantity ;
                let productId= allTransactionsItems[index].product_id;
                let locationIdTo=req.body.to;
                let locationIdFrom=req.body.from;
                
                 if(exist){   
                     promises.push(ProductBatch.update({ quantity:sequelize.literal(`quantity + ${quantity}`)},{where:{batch_number:batchNumber, product_id: productId,location_id:locationIdTo}}))
        
                 }       
                 else{
                    promises.push(ProductBatch.create({ batch_number: batchNumber, product_id: productId,location_id:locationIdTo,quantity:quantity})); 
                 }

                 promises.push(ProductBatch.update({ quantity:sequelize.literal(`quantity - ${quantity}`)},{where:{batch_number:batchNumber, product_id: productId,location_id:locationIdFrom}}))

                

              }

          }

    
     
           await Promise.all(promises).then((data) => {
                //res.json(200,"now theck this ,this time it might work");
                res.status(200).json('your oppration was succesfull')

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