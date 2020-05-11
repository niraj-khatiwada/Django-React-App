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
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/accounts/obtain-jwt-auth/',
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
      })
      .catch((error) => console.log('Error in login', error.response))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="username"
            onChange={this.handleChange.bind(this)}
            value={this.state.email}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <button classsName="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    )
  }
}
