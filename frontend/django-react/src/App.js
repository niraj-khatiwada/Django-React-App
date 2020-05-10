import React from 'react'
import './App.css'
import axios from 'axios'
import {
  faPencilAlt,
  faTrash,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons'
import Button from './components/utils/button.component'
import Forms from './components/utils/forms.component'

class App extends React.Component {
  state = {
    list: [],
    hideButton: false,
    like: 0,
    dislike: 0,
  }

  async componentDidMount() {
    await axios.get('http://127.0.0.1:8000/api/').then((res) => {
      this.setState({ list: res.data, hideButton: true })
      return res
    })
  }
  handleLikeClick(id) {}
  render() {
    const listArray = this.state.list.map((item) => (
      <div class="card text-left my-2">
        <div class="card-body">
          <h4 class="card-title">{item.title}</h4>
          <p class="card-text">{item.content}</p>
          <div className=" card-footer row justify-content-between bg-white">
            <div className="row">
              <Button iconName={faThumbsUp} stateName={this.state.like} />
              <Button iconName={faThumbsDown} stateName={this.state.dislike} />
            </div>
            <div className="row">
              <Button iconName={faPencilAlt} />
              <Button iconName={faTrash} />
            </div>
          </div>
        </div>
      </div>
    ))
    return (
      <div className="container">
        <Forms />
        <div className="App d-flex flex-column justify-content-center">
          {listArray}
        </div>
        {!this.state.hideButton ? (
          <div className="d-flex justify-content-center"></div>
        ) : null}
      </div>
    )
  }
}

export default App
