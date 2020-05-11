import React, { Component, useState } from 'react'
import Login from './login.component'
import Button from 'react-bootstrap/Button'

export default class Navbar extends Component {
  render() {
    const [show, setShow] = useState(false)

    const [modalShow, setModalShow] = React.useState(false)
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{ backgroundColor: '#c3edea' }}
      >
        <a className="navbar-brand" href="/">
          Django React App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Button variant="primary" onClick={() => this.setModalShow(true)}>
                Launch vertically centered modal
              </Button>

              <Login show={modalShow} onHide={() => this.setModalShow(false)} />
            </li>
            <li className="nav-item mr-2">
              <button className="btn btn-info">Register</button>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    )
  }
}
