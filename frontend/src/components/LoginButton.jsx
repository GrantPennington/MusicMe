import React from 'react'
import { buildLoginURI } from '../utils/buildLoginURI'
import NavTab from './LoginPage/NavTab'

function LoginButton({ label }) {
  const cid = process.env.REACT_APP_CLIENT_ID
  const rurl = process.env.REACT_APP_REDIRECT_URL
  const scope = process.env.REACT_APP_SCOPE
  const LoginURL = buildLoginURI(cid, rurl, scope)
  return (
    <>
        <NavTab label={label} navigation={LoginURL}/>
    </>
  )
}

export default LoginButton