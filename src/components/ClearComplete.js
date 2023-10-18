import React from 'react'

export const ClearComplete = ({ clearCompleted }) => {
  return (
    <div>
      <button className="button" onClick={clearCompleted}>Clear completed</button>
    </div>
  )
}
