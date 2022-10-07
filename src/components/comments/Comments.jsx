import React from 'react'
import './comments.scss'
import { BiLike, BiDislike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import {AiOutlineCaretDown} from "react-icons/ai"

export default function Comments(props) {
  return (
    <div className='comment__item'>
        <img className='comment__item-img' 
            src={props.authorProfileImageUrl}
            alt='avatar'
        />
        <div className="comment__item-container">
            <div className='comment__item-author'>
                <p>{props.authorDisplayName}</p>
                <p>{props.publishedAt}</p>
            </div>
            <p>{props.textDisplay}</p>
            <div className='comment-icons'>
                <BiLike size={16}/>
                <BiDislike size={16} className="comment-dislike-icon"/>
                {/* <img src="https://yt3.ggpht.com/ytc/AMLnZu-GEnlowROFB7TzMCDXOQx5E0vX0Fxut5IpPR6gBg=s88-c-k-c0x00ffffff-no-rj" alt="" /> */}
                {/* <FcLike size={16} className="comment-heart-icon"/> */}
                <p>PHẢN HỒI</p>
            </div>
                {/* <div className='show__feedback'>
                    <AiOutlineCaretDown/>
                    11 phản hổi
                </div> */}
        </div>
    </div>
  )
}
