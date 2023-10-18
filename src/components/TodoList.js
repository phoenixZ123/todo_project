import React, { useRef } from 'react'
import { Todo } from './Todo'

export const TodoList = ({ todos, deleteTodo, updateTodo }) => {

    return (
        <div>

            <ul className="todo-list">
                {todos.map(todo => (
                    <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} updateData={updateTodo} />
                ))}

            </ul></div>
    )
}
