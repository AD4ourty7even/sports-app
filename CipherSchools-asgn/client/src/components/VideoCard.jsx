import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './VideoCard.css'
import { useNavigate } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import moment from 'moment';


const VideoCard = ({ video }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()  
  const handleVideoClick = (e) => {
        console.log('clicked')
        navigate(`/video/${video._id}`)
    }

  const onImgLoad = (e) => {
    setIsLoading(false)
    console.log('loaded')
    console.log(e.target)
  }
  

  return (
    <a href="#" onClick={handleVideoClick}>
    <div
      className="video-card p-3 bg-[#1c1d1f] my-2 mx-1 w-fill"
    >
      <div className='thumb-container rounded-lg h-32'>
        {false ? 
        <Skeleton width={"100%"} height={"100%"}/>
        :
        <div>
          <img 
          src={`https://image.mux.com/${video.playback_id}/thumbnail.webp?width=400&height=200&fit_mode=smartcrop`} 
          loading="lazy"
          alt={video.title}
          className="h-32"
          />
        </div>
        }
      </div>
      <div className='video-details grid grid-rows-2 mt-2'>
        <div className='flex justify-between'>
          <span className='text-gray-400 text-xs'>{`By ${video.user || <Skeleton count={1}/>}`}</span>
          <span className="text-gray-400 text-xs">{`${moment.utc(video.duration*1000).format(video.duration<3600?'mm:ss':'hh:mm:ss')}`}</span>
        </div>
        <div className='w-fill whitespace-nowrap text-clip overflow-hidden'>
          <span className='video-title text-gray-200 '>{video.title || <Skeleton count={1}/>}</span>
        </div>
      </div>
    </div>
    </a>
  );
};

VideoCard.propTypes = {
  video: PropTypes.object.isRequired,
};

export default VideoCard;
