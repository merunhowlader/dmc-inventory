import Joi from 'joi';
import {User} from './../../models';
import CustomErrorHandler from './../../services/CustomErrorHandler';
import JwtService from './../../services/JwtService';
import { Product,Units,Location,LocationType,sequelize ,Sequelize,StockOpration,StockOperationItem,Inventory,RelatedOperation,LoanInventory,ProductSerialised,ProductBatch} from '../../models';
const loginController ={

    
    async myInventory (req, res, next) {

        try{
            const result = await LoanInventory.findAll({
                include:[ 
                   {
                    model:  Location ,
                   
              
                
                },

                
                {

                    
                 
                    model: Product,
                    

                }
            
            ]
            }).catch((err)=>{
             
                next(err);
            });

            const givenLoan = await  Location.findAll({
                
                include:[ 
                   {
                    model:  LoanInventory ,
                    as:'from',
                    include: 
                        {
                            
                                model:  Product ,  
                        }
                
                },
            
            ]
            }).catch((err)=>{
             
                next(err);
            });

            const takenLoan = await  Location.findAll({
                
                include:[ 
                   {
                    model:  LoanInventory ,
                    as:'to',
                    include: 
                        {
                            
                                model:  Product ,  
                        }
                    
                   
              
                
                },
            
            ]
            }).catch((err)=>{
             
                next(err);
            });

            const inventory = await  Location.findAll({
                include:[ 
                   {
                    model: Inventory ,
                    include:[{
                        model: Product,

                    },
                    {
                        model:Location
                    }
                
                
                ]
                
                }
            
            ]
            }).catch((err)=>{
             
                next(err);
            });

           
                res.json({loan:result,givenLoan:givenLoan,takenLoan:takenLoan ,inventory:inventory})

            
    
            
    
         

        }catch(e){
            next(e);

        }






    },
     
    async monthlyTransaction (req, res, next) {
        res.json('hello monthy inventory report');
    },
       
    async myDepartment(req, res, next) {
        res.json('hello monthy inventory report');
    },
    async mySubStore(req, res, next) {
        res.json('hello monthy inventory report');
    },
    async productExperation(req, res, next) {
        res.json('hello monthy inventory report');
    },
    async allUsers(req, res, next) {
        res.json('hello monthy inventory report');
    },




}

export default loginController;