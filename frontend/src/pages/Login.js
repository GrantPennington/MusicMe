import React from 'react'
import Container from '../components/LoginPage/Container';

const loginLayout = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
} 

function Login() {

  return (
    <div style={loginLayout}>
        <Container />
    </div>
  )
}

export default Login