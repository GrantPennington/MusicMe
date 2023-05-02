import React, { useEffect, useState } from 'react'
import CarouselContainer from './CarouselContainer'
import SlidingText from './SlidingText'

import './SlidingBackground.css'

const contentStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 50,
}

const textStyle = {
  color: 'white',
  fontSize: '2.3rem',
  verticalAlign: 'sub',
  textAlign: 'center',
  fontFamily: 'DM Sans, sans-serif',
}

const textContainer = {
  width: 500,
  height: 400,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50,
  marginLeft: 10,
}

const descriptions = {
  0: { text: 'Generate Spotify Playlists', color: '#2d8a4f'},
  1: { text: 'Search Artists from Spotify', color: '#026F4F' },
  2: { text: 'View Personal Playlists', color: '#813772' },
  3: { text: 'View Personal Favorites', color: '#9e3663'} ,
  4: { text: 'Rate Your Playlist Tracks', color: '#3CC47C'},
}

function CarouselState() {
  const [slide, setSlide] = useState(0)
  const [description, setDescription] = useState(descriptions[slide])

  const updateSlide = (updated) => {
    setSlide(updated)
  }

  useEffect(() => {
    setDescription(() => getSlideDesc(slide))
  },[slide])

  const getSlideDesc = (slide) => {
    return descriptions[slide]
  }

  return (
    <div style={{ width: '100%', height: 750, backgroundColor: description.color, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
      <div style={contentStyle}>
          <div style={textContainer}>
            <SlidingText description={description.text} style={textStyle}/>
          </div>
          <CarouselContainer slide={slide} update={updateSlide} />
      </div>
    </div>
  )
}

export default CarouselState