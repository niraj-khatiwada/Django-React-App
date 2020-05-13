import React from 'react'
import axios from 'axios'
import Forms from './components/utils/forms.component'
import DetailCard from './components/utils/detailCard.component'

export default class Root extends React.Component {
  state = {
    list: [],
    like: 0,
    dislike: 0,
    title: '',
    content: '',
  }

  componentDidMount() {
    this.props
      .axiosGetRequest('https://django-react-first-app.herokuapp.com/api/')
      .then((res) => {
        this.setState({ list: res.data })
      })
  }

  handleLikeClick(id) {}

  async handleFormSubmit(evt) {
    evt.preventDefault()
    await axios({
      method: 'post',
      url: 'https://django-react-first-app.herokuapp.com/api/',
      headers: {
        Authorization:
          localStorage.getItem('token') !== null
            ? `JWT ${localStorage.getItem('token')}`
            : '',
      },
      data: {
        title: this.state.title,
        content: this.state.content,
      },
    })
      .then(async () => {
        this.setState({ title: '', content: '' })
        return this.props.axiosGetRequest(
          'https://django-react-first-app.herokuapp.com/api/'
        )
      })
      .then((res) => this.setState({ list: res.data }))
      .catch((error) => console.log(error.response))
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  render() {
    const listArray = this.state.list.map((item) => (
      <DetailCard
        key={item.id}
        item={item}
        state={this.state}
        routeProps={this.props.routeProps}
        listState={() => {
          this.props
            .axiosGetRequest(
              'https://django-react-first-app.herokuapp.com/api/'
            )
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
