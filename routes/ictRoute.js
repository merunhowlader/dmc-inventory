import express from 'express';
import router from '.';
const ictRouter = express.Router();

ictRouter.get('/products',(req, res, next) => {

    console.log(req.user);
    res.json({mk:'hello ict all products'});
})

export default ictRouter;