import React from 'react'
import DetailCard from '../utils/detailCard.component'

export default class Detail extends React.Component {
  state = { title: '', content: '', user: {}, is_owner: '' }
  componentDidMount() {
    this.props
      .axiosGetRequest(
        `http://127.0.0.1:8000/api/${this.props.routeProps.match.params.id}/`
      )
      .then((res) => {
        this.setState({
          title: res.data.title,
          content: res.data.content,
          user: res.data.user,
          is_owner: res.data.is_owner,
        })
      })
      .catch((error) => console.log('Error while retrieve', error.response))
  }
  render() {
    return (
      <DetailCard
        state={this.state}
        item={{
          title: this.state.title,
          content: this.state.content,
          id: this.props.routeProps.match.params.id,
          user: this.state.user,
          is_owner: this.state.is_owner,
        }}
        routeProps={this.props.routeProps}
      />
    )
  }
}
