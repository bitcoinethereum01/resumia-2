import { useEffect, useState } from 'react'
import { FaFacebookF, FaShareAlt } from 'react-icons/fa'
import { AiOutlineLink } from 'react-icons/ai'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'
import { BsLinkedin, BsTwitter, BsWhatsapp } from 'react-icons/bs'


const ShareButtons = () => {
  const [shareURL, setShareURL] = useState("");

  const [encodedPageURL, setEncodedPageURL] = useState("");
  // const router = useRouter();
  // const { id } = router.query;
  const [isNativeShare, setNativeShare] = useState(false);
  // const [onToolTip, setOnToolTip] = useState(false);
  const { t } = useTranslation('summary')

  useEffect(() => {

    const currentURL = {
      protocol: window.location.protocol,
      host: window.location.host,
      pathname: window.location.pathname
    }
    const newPath = window.location.pathname.replace('/summary', '/share')
    const shareURL = currentURL.protocol + '//' + currentURL.host + newPath;
    setShareURL(shareURL);
    setEncodedPageURL(encodeURIComponent(shareURL));
    // setPageURL(window.location.href);
    // setEncodedPageURL(encodeURIComponent(window.location.href));

    const isShareble = typeof navigator.share === 'function'

    if (isShareble) {
      setNativeShare(true);
    }
  }, []);

  const onShareButtonClick = () => {
    navigator.share({
      url: shareURL
    })
  }

  const onCopyLinkButton = () => {
    const type = "text/plain";
    const blob = new Blob([shareURL], { type });
    const data = [new ClipboardItem({ [type]: blob })]
    navigator.clipboard.write(data)
    toast.success(t('Share.CopiedSuccess'))
  }

  return (
    <>
      <p className='text-sm hidden sm:block'>{t('Share.ButtonsTitle')}</p>
      <div className='flex sm:flex-col flex-row gap-5 text-xl text-red-300'>
        <a hidden={!isNativeShare} className='hover:text-red-400 cursor-pointer' onClick={onShareButtonClick}><FaShareAlt /></a>
        <AiOutlineLink className='cursor-pointer hover:text-red-400' onClick={onCopyLinkButton} />
        <a className='hover:text-red-400' target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedPageURL}`}><FaFacebookF /></a>
        <a className='hover:text-red-400' target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${encodedPageURL}`}><BsTwitter /></a>
        <a className='hover:text-red-400' target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedPageURL}`}><BsLinkedin /></a>
        <a className='hover:text-red-400' target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodedPageURL}`}><BsWhatsapp /></a>
          {/* <div hidden={!onToolTip}>
          <input type="text" name="link" id="link" value={pageURL} disabled/>
          <a className='hover:text-red-400' onClick={onCopyLinkButton}><FaCopy /></a>
          </div> */}
      </div>
    </>
  )
}

export default ShareButtons;