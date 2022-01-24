import Joi, { date } from 'joi';
import { Product,sequelize ,StockOpration,StockOperationItem,Inventory} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const stockOperationController ={
    
    async makeOutTransaction(req, res, next){
        res.json("hi");


     }

    ,
    async transfer(req, res, next){

        console.log(req.body);
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
                   productId:allTransactionsItems[i].productId,
                   quantity:allTransactionsItems[i].amount,
                   stockOperationId:newOperation.operation_Id
              
               }
               allItem.push(itemData);
           
            }
            

               const allitem=await StockOperationItem.bulkCreate(allItem).catch((err)=>{
                         next(err);
                })
               
            //  const promises = [];



            //  for (let i=0; i<allTransactionsItems; i++) {

            // promises.push( 
            //     Inventory.update({

            //         [req.body.Quantity]: sequelize.literal(`${req.body.Quantity} - ${allTransactionsItems[i].amount}`),
                    
            //         //[req.user.department]: `sequelize.literal(${req.user.department} + ${allTransactionsItems[i].product_quantity})`,
            //         //[req.body.to]:sequelize.literal(`${req.body.to} + ${allTransactionsItems[i].product_quantity}`)
                    
            //     }, {
            //         where: {
            //             locationId:transaction.from
            //         }
            //     })

            // //     await  Inventory.Create({ productId: allTransactionsItems[i].from ,locationId:req.body.from,Quantity: allTransactionsItems[i].amount})
                
            //  )

            // //     // await StockLocation.increment([req.user.department],{by:allTransactionsItems[i].product_quantity,where: { productProductId:allTransactionsItems[i].product_id}}).catch((err)=>{
            // //     //     next(err);
            //     //})

            // }

            // const inventory=await Inventory.Create({productId:1,locationId:2,quantity:30}).catch((err)=>{
            //     next(err);
            //      })

         function upsert(values, condition) {
                return Inventory
                    .findOne({ where: condition })
                    .then(function(obj) {
                        // update
                        if(obj)
                            return obj.increment({ quantity: +5 },
                                { where: { productId: 1,locationId: 2} });
                        // insert
                        return Inventory.create(values);
                    })
            }




            const promises = [];

            console.log('all transact item test',allTransactionsItems);



            for (let i=0; i<allTransactionsItems; i++) {
                let a=  await upsert({ productId: 1,locationId: 2,quantity:`${allTransactionsItems[i].amount}`}, { productId: 1,locationId: 2});
                console.log('upsert check ',a);


           promises.push(a)

            

           

           }


           console.log('merun kanti howlader',promises);

            // upsert({ productId: 1,locationId: 2,quantity:4}, { productId: 1,locationId: 2}).then(function(result){
            //     res.status(200).send({success: true});
            // }).catch((err)=>{
            //     console.log(err);
            // });
            // console.log(req.body.from);
            // console.log(promises);
           

            // await Promise.all(promises).then((data) => {
            //     res.json("hi");
            // }).catch((err)=>{
            //     next(err);
            // });



               

          

        }catch(err){
            next(new Error(' Somthing Wrong happen please Try aganin'));
        }



   
    
        console.log(transaction);
        console.log('all transaction',allTransactionsItems);



    },

    async stockOperation(req, res, next){
        try{

            const exist = await StockOpration.findAll({
                include: {
                    model: StockOperationItem,
                    include:
                            {
                                model: Product,
                                attributes:['name'],
                                
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
    }

   

}

export default stockOperationController;