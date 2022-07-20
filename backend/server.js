import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedroutes.js';
import productRouter from './routes/productroutes.js';
import userRouter from './routes/userroutes.js';
import orderRouter from './routes/orderroutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import Gcashroutes from './routes/gcashroutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log ('connected to db')
})
.catch((err) => {
    console.log(err.message);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/gcash', Gcashroutes);


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res)=>
    res.sendFile(path.join(__dirname,'/frontend/build/index.html'))
);

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});