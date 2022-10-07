import React, { useEffect,useState } from 'react'
import {Col, Container, Row} from "react-bootstrap"
import Categoribar  from "../../CategoriBar/Categoribar"
import Video from "../../video/Video"
import Loading from '../../loading/Loading'
import { listVideo } from '../../../redux/action'

import axios from "axios"
import { useDispatch } from 'react-redux'


const HomeScreen = () => {

const [data,setData] = useState([])
const dispatch = useDispatch()

useEffect(() =>{
  const fetchData = async  () => {
    let res = await   axios({
      "method": "GET",
      "url":'https://youtube.googleapis.com/youtube/v3/videos',
      "params":{
          'part':'snippet',
          'maxResults':'10',
          'chart':'mostPopular',
          'key':'AIzaSyBoNpm3GHoh44sSDlNpHvv4Lmq85cPLskA',
          'type':'video',
          'regionCode':'VN',
      }
    })
    console.log(res)
    let result = []
    if(res.data && res.data.items){
      let raw = res.data.items
        
      for(let i = 0 ; i < raw.length ; i ++){
        let obj = {
          idVideo:raw[i].id,
          title:raw[i].snippet.title,
          thumbnails:raw[i].snippet.thumbnails.high,
          channelTitle:raw[i].snippet.channelTitle,
          channelId:raw[i].snippet.channelId,
          publishedAt:raw[i].snippet.publishedAt,
          description:raw[i].snippet.description,
          tags:raw[i].snippet.tags,
        }   

        result.push(obj)
      }
      setData(result)
    }
  }
  fetchData()
},[])


  if(data.length !== 0){
    dispatch(listVideo(data))
    console.log("dipatch list video successful")
  }  
  else{
    console.log("Không thấy dữ liệu")
  }


  return (
    <Container>
      <Categoribar/>
      <Row>
          {
            data.length !== 0
            ? data.map((video , index) =>(
              <Col lg={3} md={4} key={index}>
                  <Video
                    id={video.idVideo}
                    title={video.title}
                    thumbnails={video.thumbnails}
                    channelId={video.channelId}
                    channelTitle={video.channelTitle}
                    publicTime={video.publishedAt}
                    description={video.description}
                    tags={video.tags}
                    />
                </Col>
            ))
            :<Loading/>
          }
      </Row>
    </Container>
  )
}

export default HomeScreen