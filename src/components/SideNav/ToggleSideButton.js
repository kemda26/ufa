import React from 'react'
import './ToggleSideButton.css'

const ToggleSideButton = (props) => {
  return (
      <button className='toggle_button' onClick={props.click}>
          <div className='toggle_button_line'/>
          <div className='toggle_button_line'/>
          <div className='toggle_button_line'/>
      </button>
  )
}

export default ToggleSideButton
