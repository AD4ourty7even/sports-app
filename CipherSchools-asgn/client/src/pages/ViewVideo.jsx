import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";

export default function ViewVideo() {
  const { videoId } = useParams();
  const [featured, setFeatured] = useState([]);
  const [videoLoading, setVideoLoading] = useState(true);
  const [video, setVideo] = useState({});
  const [views, setViews] = useState(0);
  const fetchVideo = () => {
    axios
      .get(`https://cipherschools-asgn.onrender.com/api/videos/${videoId}`)
      .then((res) => {
        console.log(res);
        setVideo(res.data);
        setVideoLoading(false);
      });
  };
  const getFeatured = () => {
    axios
      .get("https://cipherschools-asgn.onrender.com/api/videos/")
      .then((res) => setFeatured(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchVideo();
    getFeatured()
  }, [Object.keys(video).length === 0]); 

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(true);
  };

  const handleUnlike = () => {
    setLiked(false);
  };
  return (
    <>
      <div className="grid-cols-3 grid">
        <div className="col-span-2 flex flex-col">
          <div className="h-fit">
            <div className="p-4 mb-1">
              {videoLoading ? (
                <Skeleton className="lg:h-[360px] md:h-[270px] sm:h-[180px]" />
              ) : (
                <VideoPlayer playbackId={video.playback_id} autoPlay={false} />
              )}
            </div>
          </div>
          <div className="pt-4 px-10">
            <div className="flex items-center justify-between text-white rounded bg-gray-900 mb-3 px-3 py-4">
              <div className="flex">
              <div className="mr-4 flex items-center">
                <button
                  className={`mr-2 ${liked ? "text-blue-500" : ""}`}
                  onClick={handleLike}
                >
                  <HandThumbUpIcon />
                </button>
                <span>{liked ? "1" : "0"}</span>
              </div>
              <div className="mr-4 flex items-center">
                <button
                  className={`mr-2 ${!liked ? "text-blue-500" : ""}`}
                  onClick={handleUnlike}
                >
                  <HandThumbDownIcon />
                </button>
                <span>{!liked ? "1" : "0"}</span>
              </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{views}</span>
                <span>views</span>
              </div>
            </div>

            <CommentBox video={video} loaded={!videoLoading} />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col px-2">
            <span className="text-md font-bold">Featured</span>
            {featured.length === 0 ? (
              <Skeleton count={5} height="180px" width="320px" />
            ) : (
              featured.map((f, i) => {
                return (
                  <div>
                    <VideoCard key={i} video={f}/>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
