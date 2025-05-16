import { FeedbackType } from '@prisma/client'
import axios from 'axios'
import { SessionType } from 'components/types/user.types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { VscFeedback } from 'react-icons/vsc'

const FEEDBACK_MAX_LENGTH = 500;

interface FeedbackModalProps {
  setOpen: (newOpen: boolean) => void
  summaryId: string,
  type?: FeedbackType
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({setOpen, summaryId, type}) => {

  const { t } = useTranslation("summary");

  const [feedback, setFeedback] = useState('')
  const { status } = useSession() as SessionType;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value?.length > 500) return
    setFeedback(e.target.value);
  }
  const submitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      summaryId,
      type: type,
      description: feedback,
    }
    await axios.post("/api/summary/feedback", body);
  }
  return (
    <div className='w-full bg-myblack-600 flex flex-col gap-6 p-6 rounded-md'>
      <div className='flex gap-4 items-center'>
        <VscFeedback className='text-2xl'></VscFeedback>
        <h2 className='font-semibold text-lg'>{t(`Feedback.ModalTitle${type}`)}</h2>
      </div>
      {
        status === 'authenticated'
        ? <>
          <form onSubmit={submitFeedback} className='flex flex-col gap-6 relative'>
            <div className='absolute right-0 -top-7'>{feedback.length}/{FEEDBACK_MAX_LENGTH}</div>
            <textarea 
              className='bg-myblack-300 p-4 w-full resize-none' 
              placeholder={t("Feedback.Placeholder") ?? ''} 
              name="feedback" 
              id="feedback" 
              value={feedback} 
              onChange={handleChange} 
              cols={100} 
              rows={6} 
            />
            <div className='flex justify-end gap-4'>
              <button className='btnPrimary' disabled={feedback.length === 0}>
                {t("Feedback.Send")}
                <BsFillSendCheckFill className='text-white' />
              </button>
              <button type='button' className='btnSecondary' onClick={()=>setOpen(false)}>
                {t("Feedback.Close")}
                <AiFillCloseCircle className='text-white'></AiFillCloseCircle>
              </button>
            </div>
          </form>
        </>
        : <>
          <div className='flex justify-end gap-4'>
            <Link href="/login" className='btnPrimary'>
              {t("Feedback.SignIn")}
            </Link>
            <button type='button' className='btnSecondary' onClick={()=>setOpen(false)}>
              {t("Feedback.Close")}
              <AiFillCloseCircle className='text-white'></AiFillCloseCircle>
            </button>
          </div>
        </>
      }
    </div>
  )
}

export default FeedbackModal