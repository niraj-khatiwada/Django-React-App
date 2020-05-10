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
import { Route, Switch } from 'react-router-dom'
import Detail from './components/main/Detail.component'
import { Link } from 'react-router-dom'
class App extends React.Component {
  state = {
    list: [],
    like: 0,
    dislike: 0,
    title: '',
    content: '',
  }

  componentDidMount() {
    this.axiosGetRequest('http://127.0.0.1:8000/api/').then((res) => {
      this.setState({ list: res.data })
    })
  }

  async axiosGetRequest(url) {
    return await axios.get(url)
  }
  handleLikeClick(id) {}

  async handleFormSubmit(evt) {
    evt.preventDefault()
    await axios
      .post('http://127.0.0.1:8000/api/', {
        title: this.state.title,
        content: this.state.content,
      })
      .then(async () => {
        this.setState({ title: '', content: '' })
        return this.axiosGetRequest('http://127.0.0.1:8000/api/')
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
          <Link to={`/detail/${item.id}`}>
            <h4 class="card-title">{item.title}</h4>
          </Link>
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
        <Switch>
          <Route
            exact
            path="/detail/:id"
            render={(routeProps) => (
              <Detail
                axiosGetRequest={this.axiosGetRequest.bind(this)}
                routeProps={routeProps}
              />
            )}
          />
        </Switch>
        <Forms
          handleFormSubmit={this.handleFormSubmit.bind(this)}
          handleChange={this.handleChange.bind(this)}
          title={this.state.title}
          content={this.state.content}
        />
        <div className="App d-flex flex-column justify-content-center">
          {listArray.reverse()}
        </div>
      </div>
    )
  }
}

export default App
