import React, { useEffect, useState } from 'react'
import Container from '../components/LoginPage/Container';
import LoginButton from '../LoginButton';

const loginLayout = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
} 

const headerStyle = {
  height: '100px',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#334fab'
}

const containerHeaderStyle = {
  backgroundColor: 'white', 
  height: '100%', 
  width: '50%',
  display:'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

const optionsStyle = {
  backgroundColor: 'green', 
  height: '100%', 
  width: '50%',
  display:'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}

function Login() {

  const handleClick = () => {
    console.log('Logging in...')
  }

  return (
    <div style={loginLayout}>
        <Container />
    </div>
  )
}
/*
<div style={headerStyle}>
          <p style={{ fontSize: '2rem', color: 'white' }}>Welcome to MusicMe!</p>
        </div>
        
        <p style={{ fontSize: '1rem' }}>
          Click here to login with Spotify</p>
        

*/

export default Login