import React from 'react'
import Session from './Session/Session'
import PromoImg from './PromoImg'

const LoginHome = () => {
  return (
    <div className="bg-myblack-300 flex flex-col lg:flex-row w-full h-full ">
      <div className="lg:w-1/2 w-full min-h-[750px] h-screen">
        <Session/>
      </div>
      <PromoImg></PromoImg>
    </div>
  )
}

export default LoginHome