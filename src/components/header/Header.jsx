import React from 'react'
import "./header.scss"

import avatarImg from "../../images/avatar.png"
import { useNavigate } from 'react-router'

import{AiOutlineSearch} from "react-icons/ai"
import{MdNotifications , MdApps} from "react-icons/md"
import {GrMenu} from "react-icons/gr"
import {BsYoutube} from "react-icons/bs"
import { useRef,useState } from 'react'
import { useDispatch } from 'react-redux'
import {textSearch} from '../../redux/action'


const Header = ({handleToggleSidebar}) => {

  const dispath = useDispatch()
  const navigate = useNavigate()
  const handleLogoOnclick = ()=>{
    navigate(`/`)
  }
  const [searchText, setSearchText] = useState('')
  const inputDom = useRef()

 const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      dispath(textSearch(searchText))
      localStorage.setItem('searchText',JSON.stringify(searchText))
      navigate(`/search?${searchText}`)
    }
  }
  return (
    <div className=' header'>
      <div className='header__left'>
        <GrMenu className='header__left__menu' size={22}
          onClick = {handleToggleSidebar}
        />
        
        <div onClick={handleLogoOnclick}>
          <BsYoutube className='header__left__logo'/>
          <p>Youtube</p>
        </div>
       
      </div>
      <div className='header__center'>
          <input type="text" ref={inputDom}
                   onChange={(e) => setSearchText(e.target.value)}
                   onKeyPress={handleKeyPress}
          />
          <button>
            <AiOutlineSearch size={22}/>
          </button>
      </div>

      <div className="header__right">
        <div className="header__icons">
          <MdNotifications size={22}/>
          <MdApps size={28}/>
        <img
            src={avatarImg}
            alt='user'
      />
        </div>
      </div>

    </div>
  )
}

export default Header
