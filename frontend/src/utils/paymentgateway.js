import axios from 'axios';
export default async function displayRazorpay(){
        let razorPayData;
        try{
            const {data} = await axios.post('http://localhost:5000/razorpay');
            console.log("response data : ",data);
            razorPayData = data;
        }catch(err){
            console.log("error occured : ",err);
        }
    const options={
        key:'rzp_test_5TGnIfQ0Hb9MVh',
        currency:razorPayData.currency,
        amount:razorPayData.amount,
        description:"online payment with zorrro",
        order_id:razorPayData.id,
        handler:function(response){
            alert("payment Id : "+response.razorpay_payment_id);
            alert("order Id : "+response.order_id);
            console.log({"payment Id ":response.razorpay_payment_id,"order_id":response.order_id});
        },
        prefill:{
            // fill out the details 
            name: " Manoj Santra",
            email:"santramanoj201@gmail.com",
            contact:"9748159138"
        }
    }
    // display the payment on button click 
    const paymentObject =  new window.Razorpay(options);
    paymentObject.open();
}