import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!this.input.value.trim()) {
          return
        }
        dispatch(addTodo(this.input.value));
        this.input.value = '';
      }}>
        <input ref={node => {
          this.input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect() (AddTodo)