import { useState, useRef } from 'react'
import { CiLogout } from 'react-icons/ci'
import { SlOptionsVertical } from 'react-icons/sl'
import { MdOutlinePrivacyTip, MdSummarize } from 'react-icons/md'
import { BsClockHistory } from 'react-icons/bs'
import { useOnClickOutside } from '../../hooks/hooks'
import OptionItem from './OptionItem'
import { useSession, signOut } from 'next-auth/react'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'
import { useAppSelector } from 'components/store/hooks/hooks'
import { IoIosInformationCircleOutline as InfoIcon } from 'react-icons/io'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const OptionsInterface = () => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>('/');
  const [displayInfo, setDisplayInfo] = useState(false);
  const { user } = useAppSelector(state => state.users.currentUser)
  const { data: userSession } = useSession();
  const { t, i18n } = useTranslation('common')

  const ref = useRef(null);
  const infoRef = useRef(null);
  useOnClickOutside(ref, () => setDisplayOptions(false));
  useOnClickOutside(infoRef, () => setDisplayInfo(false));

  const onSignOut = async () => {
    signOut({
      callbackUrl: '/'
    });
  }

  return (
    <div className='hidden lg:flex relative h-full w-[300px] text-white flex-col justify-between border-r border-border'>
      <div id='container' className='fixed bg-myblack-600 top-0 left-0 flex flex-col justify-between h-full w-[300px]'>
        <div className='m-4 gap-3 flex flex-col'>
          <div>
            <h2 className='font-extrabold text-2xl mx-2 my-4 text-red-400'>ResumIA</h2>
          </div>
          <ul className='flex flex-col gap-3'>
            <OptionItem path='/' logo={MdSummarize} isSelected={selectedOption === '/'} onSelectOption={() => setSelectedOption('/')}>{t('newSummary')}</OptionItem>
            <OptionItem path='/summary-history' logo={BsClockHistory} isSelected={selectedOption === '/summary-history'} onSelectOption={() => setSelectedOption('/summary-history')}>{t('summaryHistory')}</OptionItem>
            <OptionItem path='/profile' logo={AiOutlineUser} isSelected={selectedOption === '/profile'} onSelectOption={() => setSelectedOption('/profile')}>{t('profile')}</OptionItem>
            <div ref={infoRef} className='flex flex-col gap-1'>
              <li className='cursor-pointer'>
                <div onClick={() => setDisplayInfo(!displayInfo)} className={`text-base flex gap-2 items-center text-gray-300 hover:bg-myblack-500 hover:text-white p-2 rounded-md`}>
                  <InfoIcon />
                  <p>{t('Information')}</p>
                </div>
              </li>
              {
                displayInfo &&
                <div className='flex flex-col gap-2 p-2 rounded-md border border-border'>
                  <OptionItem path='/privacy-policy' logo={MdOutlinePrivacyTip} style={{ fontSize: 'text-sm' }}>{t('PrivacyPolicy')}</OptionItem>
                  {/* <OptionItem path='/privacy-policy' logo={GiBlackBook} style={{ fontSize: 'text-sm' }}>{t('TermsOfUse')}</OptionItem> */}
                </div>
              }
            </div>

          </ul>
        </div>
        <div ref={ref}>
          <div>
            {displayOptions &&
              <div onClick={onSignOut} className='text-sm p-2 m-2 rounded-md border border-border'>
                <div className='flex justify-between items-center hover:bg-myblack-300 p-1 cursor-pointer'>
                  <p className=''>{t('logout')}</p>
                  <CiLogout className='text-base'></CiLogout>
                </div>
              </div>
            }
          </div>
          <div className='flex items-center justify-between px-5 py-4'>
            <div className='flex items-center gap-3'>
              {
                userSession?.user?.image ?
                  <img className='w-10 h-10 rounded-full border-[2px] border-gray-400'
                    src={userSession?.user?.image ?? ''} alt={`user avatar`} />
                  : <FaUserCircle className='text-[40px]' />
              }
              <h2 className='text-base'> {user.name ?? user.fullName} </h2>
            </div>
            <div
              onClick={() => setDisplayOptions(!displayOptions)}
              className='rounded-full cursor-pointer hover:bg-red-200 w-11 h-11 flex justify-center items-center hover:bg-opacity-10'>
              <SlOptionsVertical className='text-sm text-red-400' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptionsInterface
