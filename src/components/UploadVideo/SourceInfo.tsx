import React from 'react'
import { GiStarShuriken } from 'react-icons/gi'
import { GrYoutube } from 'react-icons/gr'
const SourceInfo = () => {
  return (
    <div className='w-1/4 border border-border rounded-sm p-4'>
      <div>
        <h2>Information - Free Trial</h2>
        <div>
          <p>The duration for any source must be between 1 - 10 minutes</p>
          <h2>For content from YouTube URL</h2>
          <GrYoutube></GrYoutube>
          <ul>
            <li>
              <div>
                <GiStarShuriken className='text-yellow-400' />
                <p>Youtube shorts are not available for summarization</p>
                <p>{`Your YouTube URL must look like this: "https://www.youtube.com/watch?v=. . ."`}</p>
                <h2>For directly uploaded files</h2>
                <p>The file must not exceed 25MB</p>
                <p>The formats must be .mp3, .mp4 or .wav</p>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default SourceInfo