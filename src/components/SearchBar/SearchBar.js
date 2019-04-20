import React, { Component } from 'react'
import './SearchBar.css'

export class SearchBar extends Component {
    handleChange(event) {

    }

  render() {
    return (
        <form className='seachbar'>
            <input type='text' placeholder='Seach...'  />
            <button type='submit'><i className="fa fa-search" ></i></button>
        </form>
    )
  }
}

export default SearchBar
