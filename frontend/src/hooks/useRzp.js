import {useState,useRef,useCallback, useEffect} from 'react'
import axios from "axios"
axios.defaults.baseURL='http://localhost:5000'
const loadScript =(src)=>{
    new Promise((resolve)=>{
        const script = document.createElement('script');
        script.src=src;
        script.onload = ()=>{
            resolve(true);
        };
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}
// create order 



const useRzp = (user)=>{
    const [paying,setPaying] = useState(false);
    const successRef = useRef(null);
    const verifyPayment = useCallback(async(options)=>{
        const {data} = await axios.post('/payment/verify',options);
        if(data.status === true) return data;
    },[])
    const successHandler = useCallback(async(e,amount,type)=>{
        try{
            const data = await verifyPayment({
                orderId:e.razorpay_order_id,
                paymentId:e.razorpay_payment_id,
                razorpay_signature:e.razorpay_signature,
                amount,
                userId:user?.id,
                type
            });
            if(data?.status){
                successRef.current && successRef.current();
                console.log("data : ",data);
            }
        }catch(err){
            console.log("something went wrong : ",err)
        }
    },[verifyPayment,successRef,user?.id])
    const createOrder = useCallback(async(amount,notes)=>{
        try{
            const {data} = await axios.post('/payment/createOrder',{amount,notes});
            console.log("data from order : ",data)
            return data;
        }catch(err){
            console.log("error occured : ",err);
        }
    },[])
   
    const checkout = useCallback(async(options)=>{
        try{
            const razorpayObj = new window.Razorpay({
                key:'rzp_test_5TGnIfQ0Hb9MVh',
                handler:(e)=>successHandler(e,options.amount,options.type),
                prefill:{
                    email:user.email,
                    name:user.name,
                    contact:user.phone
                },
                ...options
            });
            razorpayObj.open();
        }catch(err){
            console.log("error occured : ",err);
        }
    },[user,successHandler])
  
    const loadRazorpayScript = useCallback(async()=>{
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!res){
            return console.log("razorpay sdk failed to lods are yoiu online");
        }
        return null;
    },[])
    useEffect(()=>{
        if(!window?.Razorpay) loadRazorpayScript();
    },[loadRazorpayScript])
    const order = async(amount,successHandler,type='token')=>{
        successRef.current = successHandler
        try{
            setPaying(true);
            const notes ={
                type,
                amount,
                createdAt:Date.now()
            }
            const price = amount * 100;
            const orderData = await createOrder(price,notes);
            if(orderData.status){
                await checkout({order_id:orderData.data.id,amount,type})
            }
            console.log("order Data  after checkout : ",orderData);
        }catch(err){
            console.log("error occured : ",err);
        }
    }
    return {order}
}
export default useRzp