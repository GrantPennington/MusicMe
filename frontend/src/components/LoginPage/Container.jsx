import React from 'react'
import LoginButton from '../LoginButton'
import NavTab from './NavTab'
import CarouselState from '../Carousel/CarouselState'
import './Container.css'

const containerStyle = {
    width: '100%',
    height: 800,
    display: 'flex',
    backgroundColor: '#8e50a6',
    paddingTop: 25,
    borderRadius: '15px',
    flexDirection: 'column',
}

const containerHeaderStyle = {
  height: '100%',
  width: '40%',
  display:'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  paddingLeft: 70,
  alignItems: 'center',
  color: 'white',
  fontSize: '1.5rem',
  fontFamily: 'DM Sans, sans-serif',
}

const optionsStyle = {
  height: '100%', 
  width: 800,
  display:'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  color: 'white',
  fontSize: '1.25rem',
  marginLeft: '500px',
  marginRight: 50,
  fontFamily: 'DM Sans, sans-serif',
}

function Container(props) {

  return (
    <div style={containerStyle}>
        <div>
        <div style={{ height: 40, display: 'flex', flexDirection: 'row', marginTop: 15,  }}>
              <div style={containerHeaderStyle}>
                <h2>MusicMe</h2>
              </div>
              <div style={optionsStyle}>
                <NavTab label={'About'}/>
                <NavTab label={'Developer'}/>
                <NavTab label={'Learn React'} />
                <LoginButton label={'Login'} />
              </div>
        </div>
        <div>
          <CarouselState />
        </div>
      </div>
    </div>
  )
}

export default Container