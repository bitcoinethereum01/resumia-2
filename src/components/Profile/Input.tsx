import React from 'react'

interface InputProps {
  edit: boolean
  id: string
  value: string
  editValue: string
  label: string
  type: string
  handleChange: React.ChangeEventHandler
}

const Input = ({id, edit, editValue, value, label, type, handleChange}: InputProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm font-medium text-red-300'>{label}</label>
      <input
        title={`${edit ? editValue : value}`}
        id={id}
        className={`bg-transparent outline-none rounded-sm ${edit && 'border border-gray-400 p-2'}`}
        disabled={!edit}
        type={type}
        value={`${edit ? editValue : value}`}
        onChange={handleChange}/>
    </div>
  )
}

export default Input