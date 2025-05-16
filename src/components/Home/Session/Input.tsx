import React from 'react'

interface propsInput {
  name: string,
  label: string,
  pHolder: string,
  value?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type?: React.HTMLInputTypeAttribute
  setFieldTouched?: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
  mandatory?: boolean
}

const Input = ({name, label, pHolder, value, onChange, type, setFieldTouched, mandatory} : propsInput) => {

  const handleBlur = () => {
    setFieldTouched?.(name, value===''? false: true)
  }

  return (
    <div className="field">
      <label className="label block mb-2 text-sm font-medium text-gray-300"> 
        {label}
        {mandatory && <b className='text-red-400 ml-1'>*</b>}
      </label>
      <div className="control">
        <input 
        name={name}
        className="input border text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white focus:ring-red-500 focus:border-red-500" 
        type={type} 
        placeholder={`${pHolder}`}
        value={value}
        onChange={onChange}
        onBlur={handleBlur} />
      </div>
    </div>
  )
}

export default Input