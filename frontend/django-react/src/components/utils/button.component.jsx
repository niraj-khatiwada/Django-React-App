import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button({ iconName, stateName }) {
  return (
    <button
      className={`btn ${
        iconName.iconName === 'trash' ? 'btn-danger' : 'btn-primary'
      } mr-2`}
    >
      <FontAwesomeIcon icon={iconName} /> {stateName}
    </button>
  )
}
