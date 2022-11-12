
import Swal from 'sweetalert2'

import useRzp from '../hooks/useRzp'
const CourseCard = () => {
    const {order} = useRzp({name:'Santra Developers',email:'santradevelopers@gmail.com',phone:9748159138,id:'developer_id'})
   
    const successMessage = ()=>{
      Swal.fire({
        icon: 'success',
        title: 'love',
        text: 'Thanks for your payment'
      })
    }
    const createOrder=async()=>{
      try{
        await order(9000,successMessage);
      }catch(err){
        console.log("error : ",err)
      }

    }
    
  return (
    <div style={{textAlign:'center'}}>
        <h2>RazorPay payment gateway integration react</h2>
        <button type="button" onClick={createOrder}>Payment online</button>


    </div>
  )
}

export default CourseCard