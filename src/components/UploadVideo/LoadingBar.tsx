import React from 'react'
import styles from './styles/upload.module.css'

interface LoadingBarProps {
  message?: string
}
const LoadingBar = ({message}: LoadingBarProps) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-full'>
      <p className='text-lg'> {message} </p>
      <div className={styles.loader}>
        <span className={styles.stroke}></span>
        <span className={styles.stroke}></span>
        <span className={styles.stroke}></span>
        <span className={styles.stroke}></span>
        <span className={styles.stroke}></span>
        <span className={styles.stroke}></span>
        <span className={styles.stroke}></span>
      </div>
    </div>
  )
}

export default LoadingBar