import React from 'react'
import Button from '../utils/button.component'
import {
  faPencilAlt,
  faTrash,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons'

export default class Detail extends React.Component {
  state = { title: '', content: '' }
  componentDidMount() {
    console.log(this.props.routeProps)
    this.props
      .axiosGetRequest(
        `http://127.0.0.1:8000/api/${this.props.routeProps.match.params.id}/`
      )
      .then((res) => {
        console.log('Response from detail page', res)
        this.setState({ title: res.data.title, content: res.data.content })
      })
  }
  render() {
    return (
      <div class="card text-left my-2">
        <div class="card-body">
          <h4 class="card-title">{this.state.title}</h4>
          <p class="card-text">{this.state.content}</p>
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
    )
  }
}
