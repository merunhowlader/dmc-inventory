import Joi, { date } from 'joi';
import { Product,sequelize ,StockOpration} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const transactionController ={
    
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

            res.json(newOperation);

        }catch(err){
            next(new Error(' Somthing Wrong happen please Try aganin'));
        }
    
        console.log(transaction);
        console.log('all transaction',allTransactionsItems);



    },

    async stockOperation(req, res, next){
        res.json(' hello Stock Operation')
    }

   

}

export default transactionController;