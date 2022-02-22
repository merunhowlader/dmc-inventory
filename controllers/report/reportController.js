import Joi from 'joi';
import {User} from './../../models';
import CustomErrorHandler from './../../services/CustomErrorHandler';
import JwtService from './../../services/JwtService';

const loginController ={

    
    async monthlyInventory (req, res, next) {
        res.json('hello monthy inventory report');
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