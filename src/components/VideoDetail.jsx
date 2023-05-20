import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import ReactPlayer from 'react-player/youtube';
import gif from '../assets/gif.gif';
import VideoCard from './VideoCard';


const VideoDetail = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([])
 
  const { videoId } = useParams();

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
   
  }, []);

  const fetchVideoDetails = () => {
    fetchDataFromApi(`video/details/?id=${videoId}`).then((res) => {
      setVideo(res);
    });
  };

  const fetchRelatedVideos = () => {
    fetchDataFromApi(`video/related-contents/?id=${videoId}`).then((res)=>{
      setRelatedVideos(res.contents);
    });
  };


  return (
    <div className='d-flex gap-2 bg-dark text-light' style={{minHeight: '100vh'}} >
      {!video && <img className='loading' src={gif} />}
      {video && (
        <>
          <div className='flex-grow-1'>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            playing={true}
            width="100%"
            height="70vh"  
            />
            <div>
              <h3>{video.title}</h3>
              <div className='d-flex gap-5'>
                  <img src={video.author.avatar[0].url} />
                  <p>{video.author.title} </p>
                  <p>{video.author.stats.subscribersText} </p>
                  <p> {video.stats.likes} likes</p>
                  <p> {video.stats.views} views</p>
              </div>
            </div>
          </div>
          <div>
            {relatedVideos.map((video)=>{
               if(video.type !== 'video') return;
               return <VideoCard video={video} />
            })}
          </div>
        </>
      )}
    
    </div>
  )
}

export default VideoDetail
