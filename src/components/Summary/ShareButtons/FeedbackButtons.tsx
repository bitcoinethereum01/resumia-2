import { AiFillDislike, AiFillLike } from "react-icons/ai"
import { useState } from "react";
import dynamic from "next/dynamic";
import { FeedbackType } from "@prisma/client";
import { useTranslation } from "next-i18next";

const Modal = dynamic(()=>import('components/components/Modal/Modal'))
const FeedbackModal = dynamic(()=>import('./FeedbackModal'))

interface FeedbackButtonsProps {
	selectedFeedbackType?: FeedbackType
	summaryId: string;
}

export const FeedbackButtons = ({selectedFeedbackType, summaryId}: FeedbackButtonsProps) => {
	const { t } = useTranslation('summary');
	const [showModal, setShowModal] = useState(false);
	const [feedbackType, setFeedbackType] = useState<FeedbackType | undefined>(undefined);

	const onLikeClick = () => {
		setFeedbackType(FeedbackType.POSITIVE)
		setShowModal(true)
	}

	const onDislikeClick = () => {
		setFeedbackType(FeedbackType.NEGATIVE)
		setShowModal(true)
	}

	return (
	<>
		<p className='text-sm hidden sm:block'>{t('Feedback.Title')}</p>
		<div className='flex sm:flex-col flex-row gap-5 text-xl '>
			<AiFillLike 
				className={
					selectedFeedbackType === FeedbackType.POSITIVE 
					? 'text-blue-400'
					: !selectedFeedbackType ?  'hover:text-blue-400 cursor-pointer' : ""
				} 
				onClick={onLikeClick}
			/>
			<AiFillDislike 
				className={
					selectedFeedbackType === FeedbackType.NEGATIVE 
					? 'text-red-400'
					: !selectedFeedbackType ? 'hover:text-red-400 cursor-pointer' :""
				} 
				onClick={onDislikeClick}
			/>
			{
				showModal && !selectedFeedbackType &&
				<Modal open={showModal}>
					<FeedbackModal setOpen={setShowModal} summaryId={summaryId} type={feedbackType} />
				</Modal>
			}
		</div>
	</>
	)
}