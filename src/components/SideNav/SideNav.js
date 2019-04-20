import React from 'react'
import './SideNav.css'

const SideNav = (props) => {
    let sideNavClasses = ['side_nav']
    if (props.showUp) {
        sideNavClasses = ['side_nav', 'open']
    }

  return (
      <nav className={sideNavClasses.join(' ')}>
          <ul>
              <li><a href='/'>Product</a></li>
              <li><a href='/'>Product</a></li>
              <li><a href='/'>Product</a></li>
          </ul>
      </nav>
  )
}

export default SideNav
