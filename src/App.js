import React, { Component } from 'react'
import NavBar from './components/NavBar/NavBar'
import SideNav from './components/SideNav/SideNav'
import Backdrop from './components/Backdrop/Backdrop'
import SignUpForm from './components/SignUp/SignUpForm'

export class App extends Component {
    state = {
        sideNavOpen: true,
        signUpVisible: false,
    }

    toggleSideButtonHandler = () => {
        this.setState((prevState) => {return {sideNavOpen: !prevState.sideNavOpen}})
    }

    backdropClickHandler = () => {
        this.setState({signUpVisible: false})
    }

    signUpFormHandler = () => {
        this.setState({signUpVisible: true})
    }

  render() {
    let backdrop, signUpForm;
    if (this.state.signUpVisible) {
        backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler} />
    }

    if (this.state.signUpVisible) {
        signUpForm = <SignUpForm />
    }

    return (
      <div style={{height: '100%'}}>
        <NavBar toggleSideNavHandler={this.toggleSideButtonHandler} signUpFormHandle={this.signUpFormHandler} />
        <SideNav showUp={this.state.sideNavOpen} />
        {signUpForm}
        {backdrop}
      </div>
    )
  }
}

export default App
