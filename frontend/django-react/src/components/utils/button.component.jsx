import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button({ iconName, stateName }) {
  return (
    <button className="btn btn-primary mx-2">
      <FontAwesomeIcon icon={iconName} /> {stateName}
    </button>
  )
}
