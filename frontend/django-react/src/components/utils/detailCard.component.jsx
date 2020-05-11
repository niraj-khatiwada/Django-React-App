import React, { Component } from 'react'
import Button from '../utils/button.component'
import {
  faPencilAlt,
  faTrash,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons'
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
    const { item, state, routeProps, listState } = this.props
    return !this.state.editToggle ? (
      <div class="card text-left my-2">
        <div class="card-body pb-1">
          <div
            onClick={() => routeProps.history.push(`/detail/${item.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <h4 class="card-title">{item.title}</h4>
            <p class="card-text mb-2">{item.content}</p>
          </div>
          <div className=" card-footer row justify-content-between bg-white ">
            <div>
              <Button iconName={faThumbsUp} stateName={state.like} />
              <Button iconName={faThumbsDown} stateName={state.dislike} />
            </div>
            <div>
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
                    url: `http://127.0.0.1:8000/api/${item.id}/`,
                    headers: {
                      Authorization: `JWT ${localStorage.getItem('token')}`,
                    },
                  })
                    .then((res) => {
                      routeProps.history.push('/')
                      listState()
                    })
                    .catch((error) => console.log(error))
                }}
              >
                <Button iconName={faTrash} />
              </div>
            </div>
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
