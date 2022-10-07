import React, { useState } from 'react'
import "./categori.scss"

const listKeyWords = [
  'All',
  'React Js',
  'Coding',
  'Redux',
  'PHP',
  'Music',
  'Vpop',
  'MU',
  'Youtube API',
  'FrontEnd',
  'Javascript',
]

const Categoribar = () => {

  const [active,setActive] = useState('All')
  const handleKeywordsActive = (text) =>{
    setActive(text)
  }
  return (
    <div className='Categori'>
      {listKeyWords.map((text,id) =>(
          <span key={text}
                onClick={() =>handleKeywordsActive(text)}
                className = {active === text ? 'active' :''}
          >{text}</span>          
      ))}
    </div>
  )
}

export default Categoribar