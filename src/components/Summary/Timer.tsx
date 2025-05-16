import React from 'react'
import { BiTime } from 'react-icons/bi'

interface TimerProps {
  timestampStart: string
  timestampEnd: string
}

const Timer = ({ timestampEnd, timestampStart }: TimerProps) => {

  /* const [displayTimer, setDisplayTimer] = useState<boolean>(false); */

  return (
    <div
      /* onTouchStart={() => setDisplayTimer(true)}
      onTouchEnd={() => setDisplayTimer(false)} */
      className={`flex justify-center timer rounded-lg bg-gray-600 p-1 relative w-[30px] `}>
      <BiTime className='text-xl cursor-pointer' />
      {
        <div className='hidden overlay bg-gray-600 absolute w-[150px] h-full -left-[60px] -top-[30px] rounded-lg'>
          <p className='text-xs  font-medium text-white'> [{timestampStart} - {timestampEnd}] </p>
        </div>
      }
    </div>
  )
}

export default Timer