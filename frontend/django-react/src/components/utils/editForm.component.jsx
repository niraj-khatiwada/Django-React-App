import React, { Component } from 'react'
import axios from 'axios'

export default class EditForm extends Component {
  state = { title: '', content: '' }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    await axios
      .put(`http://127.0.0.1:8000/api/${this.props.id}/`, { ...this.state })
      .then((res) => {
        this.props.handleCancel()
      })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    this.setState({ title: this.props.title, content: this.props.content })
  }
  render() {
    const { handleCancel } = this.props
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div class="form-group">
              <label for="editTitle">Edit Title</label>
              <input
                type="text"
                class="form-control"
                id="editTitle"
                placeholder="Example input"
                value={this.state.title}
                onChange={this.handleChange.bind(this)}
                name="title"
              />
            </div>
            <div class="form-group">
              <label for="editContent">Edit Content</label>
              <textarea
                type="text"
                class="form-control"
                id="editContent"
                placeholder="Another input"
                value={this.state.content}
                onChange={this.handleChange.bind(this)}
                name="content"
              />
            </div>
            <button className="btn btn-primary mr-2" type="submit">
              Save
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleCancel()}
              type="button"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  }
}
