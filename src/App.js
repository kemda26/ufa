import React, { Component } from 'react'
// import Header from './components/Header/Header.jsx'
import NavBar from './components/NavBar/NavBar'
import SideNav from './components/SideNav/SideNav'
import Backdrop from './components/Backdrop/Backdrop'

export class App extends Component {
    state = {
        sideNavOpen: true
    }

    toggleSideButtonHandler = () => {
        this.setState((prevState) => {
            return {sideNavOpen: !prevState.sideNavOpen}
        })
    }

    backdropClickHandler = () => {
        this.setState({sideNavOpen: false})
    }

  render() {
    let backdrop;

    if (this.state.sideNavOpen) {
        backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler} />
    }

    return (
      <div style={{height: '100%'}}>
        <NavBar toggleSideNavHandler={this.toggleSideButtonHandler} />
        <SideNav showUp={this.state.sideNavOpen} />
        {backdrop}
        <main style={{height: '64px'}}>
            <p>PARAGRAPH</p>
        </main>
      </div>
    )
  }
}

export default App
