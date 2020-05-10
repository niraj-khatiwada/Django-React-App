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
    title: '',
    content: '',
  }

  async componentDidMount() {
    await axios.get('http://127.0.0.1:8000/api/').then((res) => {
      this.setState({ list: res.data, hideButton: true })
      return res
    })
  }
  handleLikeClick(id) {}
  async handleFormSubmit(evt) {
    console.log(evt)
    evt.preventDefault()
    await axios
      .post('http://127.0.0.1:8000/api/', {
        title: this.state.title,
        content: this.state.content,
      })
      .then(async () => {
        this.setState({ title: '', content: '' })
        return await axios.get('http://127.0.0.1:8000/api/')
      })
      .then((res) => this.setState({ list: res.data }))
      .catch((error) => console.log(error))
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
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
        <Forms
          handleFormSubmit={this.handleFormSubmit.bind(this)}
          handleChange={this.handleChange.bind(this)}
          title={this.state.title}
          content={this.state.content}
        />
        <div className="App d-flex flex-column justify-content-center">
          {listArray.reverse()}
        </div>
        {!this.state.hideButton ? (
          <div className="d-flex justify-content-center"></div>
        ) : null}
      </div>
    )
  }
}

export default App
