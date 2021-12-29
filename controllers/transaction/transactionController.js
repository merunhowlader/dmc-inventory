import Joi, { date } from 'joi';
import { Product, StockLocation, Transaction, TransactionItem,sequelize } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const transactionController ={
    
   async makeOutTransaction(req, res, next){

    console.log(req.body);
    console.log(req.user);




    let allTransactionsItems=[...req.body.items];




    let transaction ={
        from:req.body.from,
        to:req.body.to,
        serial:req.body.serialNo,
        status:req.body.rental,
        userId:req.user.id,
        
       
    }

    console.log(transaction);
    console.log('all transaction',allTransactionsItems);


    try{

    


    const newTransfarm = await Transaction.create(transaction).catch((err)=>{
         
        next(err);
    });

    if(!newTransfarm){
        next(new Error(' fast transaction error'));
    }

 let allItem=[];
 for(let i=0; i<allTransactionsItems.length;i++){
    let itemData={
        product_id:allTransactionsItems[i].product_id,
        product_name:allTransactionsItems[i].product_name,
        product_quantity:allTransactionsItems[i].product_quantity,
        product_demand:allTransactionsItems[i].product_demand,
        transactionId:newTransfarm.id
        
       




    }
    allItem.push(itemData);

 }
    


    //console.log('i',itemData);

   



  

    const allitem=await TransactionItem.bulkCreate(allItem).catch((err)=>{
              next(err);
     })


    // const  stockUpdate =await StockLocation.findAll({
    //     where:{productProductId: null}
    // })
    const  stockUpdate=await Product.findAll({
       
        attributes:['name','type'],
        include: [
            { model: StockLocation ,required: true}
        ],
        where:{product_id:3},
    }).catch((err)=>{
        next(err);

    });

    if(!stockUpdate){
        next(new Error(' stock update error'));

    }


    console.log('dtock locations',stockUpdate);

    // await StockLocation.increment(['medicine'], { by: 5, where: { productProductId: StockLocation.stock_id }}).catch((err)=>{
    //     return next(err);
    // });

    // User.update({
    //     clicks: sequelize.literal('clicks +1')
    // })

    // StockLocation.update({ 'medicin': 5}, {
    //     where: {
    //         stock_id: [8,9,10]
    //     }
    // });

    // let allpro= allTransactionsItems.map((item) => {
    //     return StockLocation.increment(['medicin'],{by:6,where: { productProductId:item.product_id}}).catch((err)=>{
    //         next(err);
    //     })

    // })


    // for (let i=0; i<allTransactionsItems.length; i++) {

    //     await StockLocation.update({

    //         [req.body.from]: sequelize.literal(`${req.body.from} - ${allTransactionsItems[i].product_quantity}`),
            
    //         //[req.user.department]: `sequelize.literal(${req.user.department} + ${allTransactionsItems[i].product_quantity})`,
    //         [req.body.to]:sequelize.literal(`${req.body.to} + ${allTransactionsItems[i].product_quantity}`)
            
    //       }, {
    //         where: {
    //             productProductId:allTransactionsItems[i].product_id
    //         }
    //       })

    //     // await StockLocation.increment([req.user.department],{by:allTransactionsItems[i].product_quantity,where: { productProductId:allTransactionsItems[i].product_id}}).catch((err)=>{
    //     //     next(err);
    //     // })

    // }

    const promises = [];

    for (let i=0; i<allTransactionsItems.length; i++) {

       promises.push( StockLocation.update({

            [req.body.from]: sequelize.literal(`${req.body.from} - ${allTransactionsItems[i].product_quantity}`),
            
            //[req.user.department]: `sequelize.literal(${req.user.department} + ${allTransactionsItems[i].product_quantity})`,
            [req.body.to]:sequelize.literal(`${req.body.to} + ${allTransactionsItems[i].product_quantity}`)
            
          }, {
            where: {
                productProductId:allTransactionsItems[i].product_id
            }
          }))

        // await StockLocation.increment([req.user.department],{by:allTransactionsItems[i].product_quantity,where: { productProductId:allTransactionsItems[i].product_id}}).catch((err)=>{
        //     next(err);
        // })

    }

    await Promise.all(promises).catch((err)=>{
        next(err);
    });

  
        

    

  
    res.json({stockUpdate})

   


     
 

    

    //res.json({success:200})

    }catch(e){
        next(e);

    }

     
     

    }

   

}

export default transactionController;