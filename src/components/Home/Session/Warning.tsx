import React from 'react'

interface ErrorMsgProps {
  children: React.ReactNode
  absolute?: boolean
}

const Warning = ({children, absolute = true}: ErrorMsgProps) => {
  return (
    <p className={`${absolute ? 'absolute' : 'relative'} text-sm text-orange-400 right-1`}> {children} </p>
  )
}

export default Warning
