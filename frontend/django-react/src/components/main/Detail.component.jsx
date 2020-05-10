import React from 'react'
import DetailCard from '../utils/detailCard.component'

export default class Detail extends React.Component {
  state = { title: '', content: '' }
  componentDidMount() {
    this.props
      .axiosGetRequest(
        `http://127.0.0.1:8000/api/${this.props.routeProps.match.params.id}/`
      )
      .then((res) => {
        this.setState({ title: res.data.title, content: res.data.content })
      })
  }
  render() {
    return (
      <DetailCard
        state={this.state}
        item={{
          title: this.state.title,
          content: this.state.content,
          id: this.props.routeProps.match.params.id,
        }}
        routeProps={this.props.routeProps}
      />
    )
  }
}
