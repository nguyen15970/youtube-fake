import React from 'react'
import "./videoSearch.scss"
import {AiOutlineCheck} from "react-icons/ai"
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {searchVideo} from "../../redux/action"

export const VideoSearch = (props) => {
  const navigate =  useNavigate()
  const [channelImg, setChannelImg] = useState()
  const dispath = useDispatch()

  
  const handleRouter = () =>{
    let obj = {
      videoId :props.videoId,
      title :props.title,
      channelTitle:props.channelTitle,
      channelImg:channelImg,
      description:props.description,
      tags:props.tags,
      publicTime:props.publishTime
    } 
    dispath(searchVideo(obj))
    navigate(`/watch/${props.videoId}`)
  }
  
  useEffect(()=>{
    async function fetchListVideo () {
      const requesURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${props.channelId}&key=AIzaSyBoNpm3GHoh44sSDlNpHvv4Lmq85cPLskA`;
      const response = await fetch(requesURL)
      const responseJson = await response.json();
      const res = responseJson.items

      setChannelImg(res[0].snippet.thumbnails.medium.url)
      }
    fetchListVideo()
  },[props])

  return (
    <div className='videosearch' onClick={() => handleRouter()}>
        <div className='videosearch__img'>
          <span>05:05</span>
          <img src={props.videoImg} alt="" />
        </div>
        <div className="videosearch__info">
            <h3 className='videosearch__info__title'>{props.title}</h3>
            <div className="videosearch__info__count">
                <p className="videosearch__info__count__view">106 lượt xem</p>
                <p className="videosearch__info__count__timepublic">{props.publishTime}</p>
            </div>
            <div className="videosearch__info__channel">
                <img src={channelImg} alt="" />
                <p>{props.channelTitle}</p>
                <AiOutlineCheck/>
            </div>
            <p className="videosearch__info__decription">
              {props.description}
            </p>
        </div>
    </div>
  )
}   