import React, {  } from 'react'
import './video.scss'
import{AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { watchVideo } from '../../redux/action';
import { useDispatch } from 'react-redux';


const Video = (props) => {
  
  const dispath = useDispatch();
  const navigate = useNavigate();
  // const [channelImg,setChannelImg] = useState([])
  let channelImg ;


 

  const handleVideoOnclick =(id)=>{
    let obj = {
      videoId :props.id,
      title :props.title,
      channelTitle:props.channelTitle,
      channelImg:channelImg,
      description:props.description,
      tags:props.tags,
      publicTime:props.publicTime
    } 
    dispath(watchVideo(obj))
    navigate(`/watch/${props.id}`)
  }
  return (
     <div className="videos" > 
      <div className="videos__top">
        <img
          onClick={() =>handleVideoOnclick(props.id)}
          src={props.thumbnails.url}
          alt=''
        />
        <span>5:30</span>
      </div>
      <div className="videos__title">
        {props.title}
      </div>
      <div className="videos__channel">
        <img src={channelImg} alt="" />
        <p>{props.channelTitle}</p>
      </div>
      <div className="videos__details">
        <span><AiFillEye/> 5m view</span>
        <span>5 day ago</span>
      </div>
     </div>
  )
}

export default Video