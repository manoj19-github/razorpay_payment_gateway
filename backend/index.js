const cors = require('cors');
const express = require('express');
const app = express()
const path = require('path');
const shortId = require('shortid');
const morgan = require('morgan');
const Razorpay = require('razorpay');
const orderRouter = require('./app/routes/payment.routes');
const uniqueid = require('uniqueid');
const crypto = require('node:crypto');


app.use(morgan('dev'));

app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true, limit: '1000mb' }));
app.use(express.json({ limit: '1000mb' }));
app.get('/',(req,res)=>{
    console.log(`backend is running at port 5000`);
    return res.send('backend is running at port 5000');
});
// app.use("/payment",orderRouter)
// // initial razorpay credentials 

const RazorpayInstance = new Razorpay({key_id:'rzp_test_5TGnIfQ0Hb9MVh',key_secret:'BSnGoel3lDbSgeJKsbvOyIRy'})
app.use(cors())
app.get('/logo.jpg',(req,res)=>{
    return res.sendFile(path.join(__dirname,`/logo2.png`))
});
app.post('/payment/createOrder',async(req,res)=>{
    const payment_capture = 1;
    const amount = Number(req.body.amount);
    const currency = 'INR';
    const options={
        amount,
        currency:currency,
        receipt:uniqueid(),
        notes:{email:"santramanoj201@gmail.com",notes:req.notes}
    }
    try{
        const response = await RazorpayInstance.orders.create(options);
        console.log("response : ",response); 
        return res.status(200).json({
            error:false,
            status:true,
            data:response
        })

    }catch(err){
        console.log("error occured : ",err);
        return res.status(500).json({
            error:true,
            status:false,
            message:"something went wrong"
        })
    }

})
app.post('/payment/verify',async(req,res)=>{
    const {orderId,paymentId,razorpay_signature,...rest} = req.body;
    try{
        const crypt = crypto
            .createHmac('sha256','BSnGoel3lDbSgeJKsbvOyIRy')
            .update(orderId + '|' + paymentId)
            .digest('hex');
            console.log("cript : ",crypt)

            if(crypt === razorpay_signature){
                return res.status(200).json({
                    status:true
                })
            }
            return res.status(400).json({
                status:false,
                message:'invalid signature'
            })
    }catch(e){
        console.log("error : ",e);
        return res.status(500).json({
            status:false,
            message:e.message
        })
    } 
})

app.listen(5000,()=>{
    console.log("server listening at 5000");
})
