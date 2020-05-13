import React, { Component } from 'react'
import Button from '../utils/button.component'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import EditForm from './editForm.component'

export default class DetailCard extends Component {
  state = {
    editToggle: false,
  }
  handleEditButtonClick(id) {
    this.setState((preState) => ({ editToggle: !preState.editToggle }))
  }
  closeEditForm() {
    this.setState({ editToggle: false })
  }
  render() {
    const { item, routeProps, listState } = this.props
    return !this.state.editToggle ? (
      <div className="card text-left my-2">
        <div className="card-body pb-1">
          <div
            onClick={() => routeProps.history.push(`/detail/${item.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between">
              <h4 className="card-title"> {item.title}</h4>
              <small className="text-muted mr-3">
                Posted by: <strong>{item.user.username}</strong>
              </small>
            </div>
            <p className="card-text mb-2">{item.content}</p>
          </div>
          <div className=" card-footer row justify-content-between bg-white ">
            {item.is_owner ? (
              <div className="ml-auto">
                <div
                  style={{ display: 'inline' }}
                  onClick={() => this.handleEditButtonClick(item.id)}
                >
                  <Button iconName={faPencilAlt} />
                </div>
                <div
                  style={{ display: 'inline' }}
                  onClick={async (evt) => {
                    await axios({
                      method: 'delete',
                      url: `https://django-react-first-app.herokuapp.com/api/${item.id}/`,
                      headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                      },
                    })
                      .then((res) => {
                        routeProps.history.push('/')
                        listState()
                      })
                      .catch((error) => console.log(error.response))
                  }}
                >
                  <Button iconName={faTrash} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ) : (
      <EditForm
        title={item.title}
        content={item.content}
        handleCancel={this.closeEditForm.bind(this)}
        id={item.id}
      />
    )
  }
}
