import React, { Component } from 'react'

export default class Forms extends Component {
  render() {
    return (
      <div className="card my-4">
        <form className="card-body">
          <div className="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="postTitle"
            />
            <small id="titleHelpText" className="form-text text-muted">
              Give a short and sweet title
            </small>
          </div>
          <div className="form-group">
            <label for="content">Content</label>
            <textarea type="text" className="form-control" id="content" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
  }
}
