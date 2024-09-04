import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import VideoCard from './VideoCard';
import { ArrowPathIcon, PlayCircleIcon } from '@heroicons/react/24/outline'




const VideoGrid = () => {
  const [sortBy, setSortBy] = useState('title'); // default sort by title
  const [videos,setVideos] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchVideos = () => {
    setLoading(true)
    return (
      axios.get('https://cipherschools-asgn.onrender.com/api/videos/')
      .then((res) => {
        setLoading(false)
        setVideos(res.data)
        
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    );
  }

  useEffect(() => {
    fetchVideos()
  }, [videos.length===0]);

  useEffect(() => {
    sortVideos(sortBy)
  }, [sortBy])



  const sortVideos = (sortBy) => {
    console.log('sorted by '+sortBy)
    switch (sortBy) {
      case 'title':
        setVideos(videos.sort((a, b) => a.title.localeCompare(b.title)));
      case 'duration':
        setVideos(videos.sort((a, b) => a.duration - b.duration));
      default:
        setVideos(videos.sort((a, b) => a.title.localeCompare(b.title))); // sort by date in descending order
    }
  };


  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recommended</h2>
        <div className="flex items-center">
          <label htmlFor="sort-by-select" className="mr-2 font-bold">
            Sort by:
          </label>
          <select
            id="sort-by-select"
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-900"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            
            <option className="text-gray-900" value="title">Title</option>
            <option className="text-gray-900" value="duration">Duration</option>
          </select>
        </div>
      </div>
      <div className='min-h-1/3 w-full flex justify-center'>
      {loading?<div className=" w-8 animate-spin "><ArrowPathIcon /></div>
      :<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>}
      </div>
    </div>
  );
};

export default VideoGrid;
