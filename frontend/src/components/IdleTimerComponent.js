import {IdleTimerProvider,useIdleTimerContext} from 'react-idle-timer'
import {useRef} from 'react'
import Swal from 'sweetalert2'
const IdleTimerComponent = ({children}) => {
    const onIdleFunction = ()=>{
        Swal.fire({
            icon: 'warning',
            title: 'Logout',
            text: 'your session has been logged out',
            showCancelButton: false,
            confirmButtonColor: '#3085d6'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
               { icon: 'warning',
                title: 'Please Log in again to continue',
                text: 'Please Log in again to continue'}
              )
            }
          })
    }
  return (
    <div>
        <IdleTimerProvider timeout={5*1000} onIdle={onIdleFunction}>
            {children}
        </IdleTimerProvider>
    </div>
  )
}

export default IdleTimerComponent