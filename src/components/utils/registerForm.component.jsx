import React, { Component } from 'react'
import axios from 'axios'

export default class RegisterForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password1: '',
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    let csrf_token
    if (document.cookie.includes('csrftoken')) {
      csrf_token = document.cookie
      csrf_token = csrf_token.replace('csrftoken=', '')
    }
    await axios({
      method: 'post',
      url: 'https://django-react-first-app.herokuapp.com/accounts/register/',
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password1: this.state.password1,
      },
      headers: {
        'X-CSRFToken': csrf_token,
      },
    })
      .then((res) => {
        console.log(res.data)
        this.props.openLoginAfterRegister()
      })
      .catch((error) => console.log('Error in regisetr', error.response))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="exampleInputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            aria-describedby="username"
            name="username"
            onChange={this.handleChange.bind(this)}
            value={this.state.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail"
            name="email"
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            name="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password1"
            value={this.state.password1}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Signup
        </button>
      </form>
    )
  }
}
