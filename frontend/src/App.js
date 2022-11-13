import {useEffect} from 'react'
import './App.css';
import CourseCard from './components/CourseCard';
import IdleTimerComponent from './components/IdleTimerComponent';
function App() {
  // const loadScript = (src)=>{
  //   return new Promise((resolve)=>{
  //     const script = document.createElement('script');
  //     script.src = src;
  //     script.onload = ()=>{
  //       resolve(true)
  //     }
  //     script.onerror=()=>{
  //       resolve(false);
  //     }
  //     document.body.appendChild(script);
  //   });
    

  // }
  // useEffect(()=>{
  //   loadScript('https://checkout.razorpay.com/v1/checkout.js')
  // })
  return (
    <IdleTimerComponent>
    <section className='card-list'>
      <CourseCard/>
      
    </section>
   </IdleTimerComponent>
  );
}

export default App;
