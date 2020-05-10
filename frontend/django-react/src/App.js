import React from 'react'
import './App.css'
import axios from 'axios'

class App extends React.Component {
  state = {
    list: [],
    hideButton: false,
    like: 0,
    dislike: 0,
  }
  async handleClick() {
    return await axios.get('http://127.0.0.1:8000/api/').then((res) => {
      this.setState({ list: res.data, hideButton: true })
      return res
    })
  }
  handleLikeClick(id) {}
  render() {
    const listArray = this.state.list.map((item) => (
      <div class="card text-left">
        <div class="card-body">
          <h4 class="card-title">{item.title}</h4>
          <p class="card-text">{item.content}</p>
          <div className="row w-25">
            <button
              className="btn btn-primary mx-3"
              onClick={() => this.handleLikeClick(item.id)}
            >
              Like {this.state.like}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(evt) => this.handleDisLikeClick(evt)}
            >
              Dislike {this.state.dislike}
            </button>
          </div>
        </div>
      </div>
    ))
    return (
      <div className="container">
        <div className="App d-flex flex-column justify-content-center">
          {listArray}
        </div>
        {!this.state.hideButton ? (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary "
              onClick={() => this.handleClick()}
            >
              Click
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}

export default App
