import React from 'react'
import "./sidebarRight.scss"
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { watchVideo } from "../../redux/action" 

export const SidebarRight = (props) => {
  const navigate = useNavigate();
  const Dispatch = useDispatch()

  const handleRouterOnlick = () =>{
  
    Dispatch(watchVideo(props))
    navigate(`/watch/${props.videoId}`)
  }


  return (
    <div className='sidebarRight__video' onClick={handleRouterOnlick}>
      <div className="sidebarRight__video__img">
        <img src={props.videoImg} alt='' />
      </div>
        <div className='sidebarRight__content'>
            <p className='sidebarRight__content__title'>
               {props.title}
            </p>
            <p className='sidebarRight__content__channel'>
                {props.channelTitle}
            </p>
            <div className='sidebarRight__content__bottom'>
              <p>10 N lượt xem</p>
              <p>2 tuần trước</p>
            </div>
        </div>

    </div>
  )
}
