import React, { Component } from 'react'

export default class Forms extends Component {
  render() {
    const { handleFormSubmit, handleChange, title, content } = this.props
    return (
      <div className="card my-4">
        <form className="card-body" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              aria-describedby="postTitle"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              type="text"
              className="form-control"
              id="content"
              value={content}
              onChange={handleChange}
            />
          </div>
          {localStorage.getItem('token') !== null ? (
            <button
              type="submit"
              className="btn btn-info"
              onClick={handleFormSubmit}
            >
              Post
            </button>
          ) : (
            <button
              className="btn btn-info disabled"
              style={{ cursor: 'not-allowed' }}
            >
              Login first
            </button>
          )}
        </form>
      </div>
    )
  }
}
