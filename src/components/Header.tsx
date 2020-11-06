import React from 'react'
import {ReactComponent as Logo} from "../images/TH.svg"
import './Header.css'

function Header() {
  return (
    <header>
      <Logo className="logo"/>      
    </header>
  )
}

export default Header