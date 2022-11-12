const uniqueid = require('uniqueid');
const Razorpay = require('razorpay');
const crypto = require('node:crypto');
const razorInstance = new Razorpay({key_id:'rzp_test_5TGnIfQ0Hb9MVh',key_secret:'BSnGoel3lDbSgeJKsbvOyIRy'})
const createOrder = (req,res)=>{
    try{
        const options={
            amount:500*100,
            currency:'INR',
            receipt:uniqueid()
        }
        razorInstance.orders.create(options,(err,order)=>{
            if(err){
                console.log("error occured")
                return res.status(400).json({
                    error:true,
                    message:err.message
                })
            }else{
                return res.status(200).json({
                    error:false,
                    message:order
                })

            }
        })
    }catch(err){
        console.log("error occured : ",err);
    }

}
const paymentCallback = (req,res)=>{
    try{

    }catch(err){
        console.log("error occured : ",err);
    }    

}

module.exports = {
    createOrder,
    paymentCallback

}