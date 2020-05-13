import React, { Component } from 'react'
import axios from 'axios'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    let csrf_token
    if (document.cookie.includes('csrftoken')) {
      csrf_token = document.cookie
      csrf_token.replace('csrftoken', '')
    }
    await axios({
      method: 'post',
      url:
        'https://django-react-first-app.herokuapp.com/accounts/obtain-jwt-auth/',
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      headers: {
        'X-CSRFToken': csrf_token,
      },
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        window.location.reload()
        this.props.closeAfterLogin()
      })
      .catch((error) => console.log('Error in login', error.response))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="username"
            onChange={this.handleChange.bind(this)}
            value={this.state.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    )
  }
}
