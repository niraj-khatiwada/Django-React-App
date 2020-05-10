import React, { Component } from 'react'
import Button from '../utils/button.component'
import {
  faPencilAlt,
  faTrash,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default class DetailCard extends Component {
  render() {
    const { item, state, routeProps, listState } = this.props
    return (
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
              <div style={{ display: 'inline' }}>
                <Button iconName={faPencilAlt} />
              </div>
              <div
                style={{ display: 'inline' }}
                onClick={async (evt) => {
                  await axios
                    .delete(`http://127.0.0.1:8000/api/${item.id}/`)
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
    )
  }
}
