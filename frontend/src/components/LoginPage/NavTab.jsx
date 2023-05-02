import React from 'react'
import './NavTab.css'

function NavTab({ label, navigation }) {
  return (
    <div>
      { navigation ? 
        <a href={navigation} className={'login-nav'}>
          <p>{label}</p>
        </a>
        :
        <p className={'nav'}>{label}</p>
      }
    </div>
  )
}

export default NavTab