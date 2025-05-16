import React, { useRef, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import OptionItem from './OptionItem'
import { MdOutlinePrivacyTip, MdSummarize } from 'react-icons/md'
import { BsClockHistory } from 'react-icons/bs'
import { CiLogout } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'
import { signOut } from 'next-auth/react'
import { IoIosInformationCircleOutline as InfoIcon } from 'react-icons/io'
import { useTranslation } from 'next-i18next'

interface ShowOptionsProps {
  headerHeight: number
  onSelectOption: () => void
  open: boolean
}

const ShowOptions = ({ headerHeight, onSelectOption, open }: ShowOptionsProps) => {
  const [displayInfo, setDisplayInfo] = useState(false);
  const { t } = useTranslation('common')

  const onSignOut = async () => {
    signOut({
      callbackUrl: '/'
    });
  }

  return (
    <div className={`bg-myblack-500 absolute w-full transition-transform ease-in-out delay-150 ${open ? '' : '-translate-x-full' }`} style={{ height: `calc(100vh - ${headerHeight}px)` }}>
      <div className='flex flex-col h-full justify-between'>
        <ul className='flex flex-col gap-3 p-3'>
          <OptionItem onSelectOption={onSelectOption} path='/' logo={MdSummarize}>{t('newSummary')}</OptionItem>
          <OptionItem onSelectOption={onSelectOption} path='/summary-history' logo={BsClockHistory}>{t('summaryHistory')}</OptionItem>
          <OptionItem onSelectOption={onSelectOption} path='/profile' logo={AiOutlineUser}>{t('profile')}</OptionItem>
          <div className='flex flex-col gap-1'>
            <li className='cursor-pointer'>
              <div onClick={() => setDisplayInfo(displayInfo ? false : true)} className={`text-base flex gap-2 items-center text-gray-300 hover:bg-red-400 hover:text-white p-2 rounded-md`}>
                <InfoIcon />
                <p>{t('Information')}</p>
              </div>
            </li>
            {
              displayInfo &&
              <div onClick={onSignOut} className='flex flex-col gap-2 p-2 border-t-2 border-t-gray-500'>
                <OptionItem path='/privacy-policy' logo={MdOutlinePrivacyTip} style={{ fontSize: 'text-sm' }}>{t('PrivacyPolicy')}</OptionItem>
                {/* <OptionItem path='/privacy-policy' logo={GiBlackBook} style={{ fontSize: 'text-sm' }}> Terms of Use </OptionItem> */}
              </div>
            }
          </div>
        </ul>
        <div onClick={onSignOut} className='flex justify-between items-center bg-myblack-300 hover:bg-red-400 p-3 cursor-pointer'>
          <p className=''>{t('logout')}</p>
          <CiLogout className='text-xl'></CiLogout>
        </div>
      </div>
    </div>
  )
}

const OptionsMediumScreen = () => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [headerSize, setHeaderSize] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleHamburgerMenu = () => {
    setDisplayOptions(displayOptions ? false : true)
    if (headerRef.current) {
      setHeaderSize(headerRef.current.offsetHeight);
    }
  }

  const onSelectOption = () => {
    setDisplayOptions(false);
  }

  return (
    <div className='block lg:hidden fixed w-full z-50 bg-myblack-600'>
      <div ref={headerRef} className='text-xl w-full flex items-center px-3'>
        <div className='text-2xl cursor-pointer' onClick={handleHamburgerMenu}>
          {
            displayOptions ? <IoMdClose /> : <RxHamburgerMenu />
          }
        </div>
        <div className='w-full flex justify-center'>
          <h2 className='font-extrabold text-2xl mx-2 my-4 text-red-400'>ResumIA</h2>
        </div>
      </div>
      {
        <ShowOptions headerHeight={headerSize} onSelectOption={onSelectOption} open={displayOptions} />
      }
    </div>
  )
}

export default OptionsMediumScreen