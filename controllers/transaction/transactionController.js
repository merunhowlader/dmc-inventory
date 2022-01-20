import Joi, { date } from 'joi';
import { Product,sequelize } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const transactionController ={
    
    async makeOutTransaction(req, res, next){



        res.json("hi");



     
     

     }

    ,
    async transfer(req, res, next){
        res.json(' hello transfer')
    },

    async stockOperation(req, res, next){
        res.json(' hello Stock Operation')
    }

   

}

export default transactionController;