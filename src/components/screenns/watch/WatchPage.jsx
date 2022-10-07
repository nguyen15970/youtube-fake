import {React, useState, useEffect} from 'react'
import { SidebarRight } from '../../sidebar-right/SidebarRight'
import "./watch.scss" 
import axios from "axios";

import {AiOutlineLike} from "react-icons/ai"
import {BiDislike} from "react-icons/bi"
import {RiShareForwardLine} from "react-icons/ri"
import {BsDownload} from "react-icons/bs"
import {IoCutOutline} from "react-icons/io5"
import {MdOutlineSort} from 'react-icons/md'
import Comments from '../../comments/Comments'
import { watch_Video } from '../../../redux/selector'
import { useSelector } from 'react-redux'
import {list__video } from '../../../redux/selector';


export const Watch = () => {

  
  const [showDescription , setShowDescription] = useState(false)
  const [activeTitle, setActiveTitle] = useState('Tất cả')
  const [countStatic ,setCountStatic] = useState({})
  const [likeCount, setLikeCount] = useState('')
  const [comment, setComment] = useState([])

  
  const video = useSelector(watch_Video);
  const  videoId = video.videoId;

  const listVideo = useSelector(list__video)
  
  console.log(Math.floor(Math.random() * 7))


  document.title = video.title;
  const handleShowDescript = () =>{
    setShowDescription(value => !value)
  }

  const keyword = [
    "Tất cả",
    "Video có liên quan",
    "Tải lên gần đây",
    "Video của bản",
    "Âm nhạc",
    "React js",
  ]

  const handleActiveTitle = (text) =>{  
    setActiveTitle(text)
  }




  useEffect(() =>{
    const fetchData = async  () => {
      let res = await   axios({
        "method": "GET",
        "url":'https://youtube.googleapis.com/youtube/v3/videos',
        "params":{
            'part':'snippet,contentDetails,statistics',
            'key':'AIzaSyA8NZBTkBkwh0gQQzsfg1LSBjcI-EnTbjQ',
            'id':videoId,
        }
      })
      let raw = res.data.items
      let obj ={
        commentsCount : raw[0].statistics.commentCount,
        viewcount     : raw[0].statistics.viewCount,
        publishedAt   : raw[0].snippet.publishedAt
      }
      setCountStatic(obj)
      setLikeCount(raw[0].statistics.likeCount)
    }
    fetchData()
  },[videoId])


  useEffect(() =>{
    const fetchData = async  () => {
      let res = await   axios({
        "method": "GET",
        "url":'https://youtube.googleapis.com/youtube/v3/commentThreads',
        "params":{
            'part':'snippet,replies',
            'key':'AIzaSyBoNpm3GHoh44sSDlNpHvv4Lmq85cPLskA',
            'videoId':videoId,
        }
      })

      let raw = res.data.items;
      let resutl =[]
      for(let i = 0 ; i < raw.length ; i++ ){
          let obj ={
            authorChannelId : raw[i].snippet.topLevelComment.snippet.authorChannelId,
            authorDisplayName : raw[i].snippet.topLevelComment.snippet.authorDisplayName,
            authorProfileImageUrl : raw[i].snippet.topLevelComment.snippet.authorProfileImageUrl,
            publishedAt : raw[i].snippet.topLevelComment.snippet.publishedAt,
            textDisplay : raw[i].snippet.topLevelComment.snippet.textDisplay,
            replies : raw[i].snippet.topLevelComment.replies,

          }
          resutl.push(obj)

      }
      setComment(resutl)
    }
    fetchData()
  },[videoId])

 
  return (
    <div className='watch-container'>
        <div className='watch'>
          <iframe 
              height="538" 
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title} 
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
          </iframe>
          <div className='watch__tag'>
              <span>
                #{video.channelTitle}
              </span>
          </div>
          <h5 className='watch__title'>{video.title}</h5>
          <div className='watch__exten'>
              <div>
                <p className='watch__exten__view'>{countStatic.viewcount} lượt xem</p>
                <p className='watch__exten__timePublic'>{countStatic.publishedAt}</p>
              </div>
              <p className='watch__exten__like'><AiOutlineLike size={20}/>{likeCount}</p>
              <p className='watch__exten__dislike'><BiDislike size={20}/>Không thích</p>
              <p className='watch__exten__share'><RiShareForwardLine size={20}/>Chia sẻ</p>
              <p className='watch__exten__dowload'><BsDownload size={20}/>Tải xuống</p>
              <p className='watch__exten__share'><IoCutOutline size={20}/>Tạo đoạn video</p>
          </div>
          <div className='watch__auth'>
              <div className="watch__auth__channel">
                  <img src={video.channelImg} alt="" />
                  <div className=''>
                      <p className='watch__auth__channel-name'>{video.channelTitle}</p>
                      <p className='watch__auth__channel-subview'>229 N người đăng ký</p>
                  </div>
              </div>
              <div className='watch__auth__sub'>Đăng ký</div>
              <div className='watch__auth__descripttion'>
                <div className='watch__auth__tag'>
                </div>
                <pre className={showDescription ? "" : "descripttion-text"}>
                  {video.description}
                </pre>

                <button onClick={handleShowDescript} className='show-description'>
                  {showDescription ? 'Ẩn bớt' : 'Hiện thêm'}
                </button>
              </div>
          </div>

          <div className='watch__comment'>
            <div className='watch__comment__title'>
              <p className='count__comment'>
                {countStatic.commentsCount} Bình Luận
              </p>
              <p className='comment__sort'><MdOutlineSort size={18}/>SẮP XẾP THEO</p>
            </div>

            <div className='watch__comment__input'>
              <img  src='https://vtv1.mediacdn.vn/thumb_w/650/2022/3/4/avatar-jake-neytiri-pandora-ocean-1646372078251163431014-crop-16463720830272075805905.jpg'
                    alt=''
              />
              <input type='text' placeholder="Viết bình luận..."/>
            </div>
            <div className='comment__list'>
             {comment.length !== 0 
              ?  comment.map((list,index) =>(
                  <Comments 
                    key={index}
                    authorChannelId = {list.authorChannelId}
                    authorDisplayName = {list.authorDisplayName}
                    authorProfileImageUrl = {list.authorProfileImageUrl}
                    publishedAt = {list.publishedAt}
                    textDisplay = {list.textDisplay}
                    replies = {list.replies}
                  />
               ))
            
                : <p>Không có dữ liệu</p>
              }
            </div>
          </div>
        </div>
        <div className='watch-container-right'>
          <div className='sidebar__right-title'>
              {keyword.map((value,index) => (
                <span
                  onClick={() =>handleActiveTitle(value)}
                  className={activeTitle === value ? "span-active":""}
                  key={index}>
                    
                    {value}
                </span> 
              ))}
          </div>
          {
            listVideo !== undefined
              ? listVideo.map((video,index) =>(
                <SidebarRight
                  key = {index}
                  videoId= {video.idVideo}
                  channelId = {video.channelId}
                  channelTitle = {video.channelTitle}
                  description = {video.description}
                  publishedAt = {video.publishedAt} 
                  tags = {video.tags}
                  videoImg = {video.thumbnails.url}
                  title = {video.title}
                />
              ))
              : <h3>Không lấy được dữ liệu</h3>
          }
        </div>
    </div>
  )
}
