import React from 'react'
import './SignInForm.css'

function SignInForm() {
  return (
    <div className='signin_modal'>
      <form className='signin_form animate'>
            <b>Username</b>
            <input type='text' placeholder='Username' />
            <b>Password</b>
            <input type='password' placeholder='Password' />
            <button >Log In</button>
      </form>
    </div>
  )
}

export default SignInForm
