import React, { Component } from 'react'
import NavBar from './components/NavBar/NavBar'
import SideNav from './components/SideNav/SideNav'
import Backdrop from './components/Backdrop/Backdrop'
import SignUpForm from './components/SignUp/SignUpForm'
import SignInForm from './components/SignIn/SignInForm'

export class App extends Component {
    state = {
        sideNavOpen: true,
        signUpVisible: false,
        signInVisible: false
    }

    toggleSideButtonHandler = () => {
        this.setState((prevState) => {return {sideNavOpen: !prevState.sideNavOpen}})
    }

    backdropClickHandler = () => {
        this.setState({signUpVisible: false})
        this.setState({signInVisible: false})
    }

    signUpFormHandler = () => {
        this.setState({signUpVisible: true})
    }

    signInFormHandler = () => {
        this.setState({signInVisible: true})
    }

  render() {
    let backdrop, signUpForm, signInForm;
    if (this.state.signUpVisible || this.state.signInVisible) {
        backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler} />
    }

    if (this.state.signUpVisible) {
        signUpForm = <SignUpForm />
    }

    if (this.state.signInVisible) {
        signInForm = <SignInForm />
    }

    return (
      <div style={{height: '100%'}}>
        <NavBar 
            toggleSideNavHandler={this.toggleSideButtonHandler} 
            signUpFormHandle={this.signUpFormHandler} 
            signInFormHandle={this.signInFormHandler}
        />
        <SideNav showUp={this.state.sideNavOpen} />
        {signUpForm}
        {signInForm}
        {backdrop}
      </div>
    )
  }
}

export default App
