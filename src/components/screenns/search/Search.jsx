import React from 'react'
import { useEffect } from 'react'
import { VideoSearch } from '../../videoSearch/VideoSearch'
import "./search.scss"
import { useSelector } from 'react-redux'
import {search__text } from "../../../redux/selector"
import { useState } from 'react'
import Loading from '../../loading/Loading'
import Swal from 'sweetalert2'



export default function Search() {
  const textSearch = useSelector(search__text);
  const [searchVideo , setSearchVideo] = useState([])
  console.log(textSearch);
  document.title = textSearch;

  useEffect(()=>{
      async function fetchListVideo () {
        const requesURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${textSearch}&maxResults=5&type=video&key=AIzaSyApu2wRh8Ei3RzUJPtRZMfCk7H6nHcfFXo`;
        const response = await fetch(requesURL)
        const responseJson = await response.json();

        const res = responseJson.items
        let result = []
        if(res){
          for(let i = 0 ; i < res.length ; i++){
          
            let obj = {
              videoId : res[i].id.videoId,
              title:res[i].snippet.title,
              channelTitle:res[i].snippet.channelTitle,
              channelId:res[i].snippet.channelId,
              publishTime:res[i].snippet.publishTime,
              videoImg:res[i].snippet.thumbnails.high.url,
              description:res[i].snippet.description,
              tags:res[i].snippet.tags
            }
            result.push(obj)
          }
        }
        else{
          setTimeout(() =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Vượt quá giới hạn số lần gọi API',
            })

          },2000)
        }
        setSearchVideo(result)
      }
      fetchListVideo()
  },[textSearch])

  return (
    <div className='search__container'>
          {
            searchVideo.length  !== 0 
              ?  searchVideo.map((list,index) =>(
                  <VideoSearch
                    key = {index}
                    videoId = {list.videoId}
                    title = {list.title}
                    channelTitle = {list.channelTitle}
                    channelId = {list.channelId} 
                    publishTime = {list.publishTime}
                    videoImg = {list.videoImg}
                    description = {list.description}
                    tags = {list.tags}
                  />
                ))
              : <Loading/>
          }
    </div>
  )
}
