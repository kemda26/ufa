import React from 'react'
import './NavBar.css'
import ToggleSideButton from '../SideNav/ToggleSideButton'
import SearchBar from '../SearchBar/SearchBar'

const NavBar = (props) => {
  return (
    <header className='navbar'>
      <nav className='navbar_nav'>
        <div>
            <ToggleSideButton click={props.toggleSideNavHandler} />
        </div>
        <div className='navbar_logo'><a href='/'>uFacilities</a></div>
        <div className='spacer' />
        <div>
            <SearchBar />
        </div>
        <div className='navbar_list'>
            <button className='signup_btn' onClick={props.signUpFormHandle} >Sign Up</button>
            <button className='signin_btn'>Sign In</button>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
