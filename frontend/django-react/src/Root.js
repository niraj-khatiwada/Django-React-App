import React from 'react'
import './App.css'
import axios from 'axios'
import Forms from './components/utils/forms.component'
import DetailCard from './components/utils/detailCard.component'

class App extends React.Component {
  state = {
    list: [],
    like: 0,
    dislike: 0,
    title: '',
    content: '',
  }

  componentDidMount() {
    this.props.axiosGetRequest('http://127.0.0.1:8000/api/').then((res) => {
      this.setState({ list: res.data })
    })
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
        return this.props.axiosGetRequest('http://127.0.0.1:8000/api/')
      })
      .then((res) => this.setState({ list: res.data }))
      .catch((error) => console.log(error))
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  render() {
    const listArray = this.state.list.map((item) => (
      <DetailCard
        item={item}
        state={this.state}
        routeProps={this.props.routeProps}
        listState={() => {
          this.props
            .axiosGetRequest('http://127.0.0.1:8000/api/')
            .then((res) => {
              this.setState({ list: res.data })
            })
        }}
      />
    ))
    return (
      <div>
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
