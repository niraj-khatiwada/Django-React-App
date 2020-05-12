import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import LoginForm from './loginForm.component'
import RegisterForm from './registerForm.component'

export default function Navbar() {
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setTimeout(() => setRegister(false), 1000)
  }
  const handleShow = () => setShow(true)
  const [isRegister, setRegister] = useState(false)
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top "
      style={{ backgroundColor: '#c3edea' }}
    >
      <div className="d-flex justify-content-between w-100">
        <a className="navbar-brand d-block w-100" href="/">
          Django React App
        </a>
        <div className="w-100 d-flex justify-content-end">
          {localStorage.getItem('lUser') === null ? null : (
            <strong className="mr-2 d-flex align-items-center">
              {localStorage.getItem('lUser')}
            </strong>
          )}
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
        </div>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-2 align-items-center d-flex">
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>{isRegister ? 'Signup' : 'Login'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {!isRegister ? (
                  <LoginForm closeAfterLogin={handleClose} />
                ) : (
                  <RegisterForm
                    openLoginAfterRegister={() => setRegister(false)}
                  />
                )}
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                {!isRegister ? (
                  <div>
                    Don't have an account yet?
                    <button
                      className="btn btn-outline-dark btn-sm ml-2"
                      onClick={() => setRegister(true)}
                    >
                      {' '}
                      Signup
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-dark btn-sm ml-2"
                    onClick={() => setRegister(false)}
                  >
                    Login instead
                  </button>
                )}
              </Modal.Footer>
            </Modal>
          </li>
        </ul>
      </div>
    </nav>
  )
}
