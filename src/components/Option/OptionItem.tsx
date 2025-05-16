import { IconType } from "react-icons"
import Link from "next/link"
import { HTMLAttributeAnchorTarget } from "react"
interface OptionProps {
  children: React.ReactNode
  logo: IconType
  target?: HTMLAttributeAnchorTarget 
  path?: string
  onSelectOption?: () => void
  isSelected?: boolean;
  style?: {
    fontSize: string
  }
}


const OptionItem = ({ children, logo: Logo, target, path = '/', onSelectOption, isSelected, style}: OptionProps) => {
  return (
    <li className='cursor-pointer'>
      <Link href={path} target={target} onClick={onSelectOption} className={`${isSelected? 'bg-myblack-500 text-white':'bg-none text-gray-300'} ${style ? style.fontSize : 'text-base'} flex gap-2 items-center text-gray-300 hover:bg-red-400 lg:hover:bg-myblack-500 hover:text-white p-2 rounded-md`}>
        {<Logo />}
        <p>{children}</p>
      </Link>
    </li>
  )
}


export default OptionItem