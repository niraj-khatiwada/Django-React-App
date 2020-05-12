import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import LoginForm from './loginForm.component'

export default function Navbar() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top"
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
          <li className="nav-item mr-2 align-items-center d-flex">
            {localStorage.getItem('lUser') === null ? null : (
              <strong>{localStorage.getItem('lUser')}</strong>
            )}
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <LoginForm closeAfterLogin={handleClose} />
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                Don'have an account yet? <a href="#">Register</a>
              </Modal.Footer>
            </Modal>
          </li>
          <li className="nav-item mr-2">
            {localStorage.getItem('token') === null ? (
              <Button variant="info" onClick={handleShow}>
                Login
              </Button>
            ) : (
              <Button
                variant="info"
                onClick={() => {
                  localStorage.clear()
                  window.location.reload()
                }}
              >
                Log Out
              </Button>
            )}
          </li>
          <li className="nav-item mr-2"></li>
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
