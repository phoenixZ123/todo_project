import React, { useState } from 'react'

export const Todo = ({ todo, deleteTodo, updateData }) => {
    const [isEdit, setEdit] = useState(false);
    const [text, setText] = useState(todo.title);
    
    const updateTodoHandler = (e) => {
        e.preventDefault();
        let updatedData = {
            id: todo.id,
            title: text,
            completed: todo.completed
        }
        setEdit(false)
        updateData(updatedData)

    }
    // const CheckBoxMark = () => {
    //     todo.completed = true;
    //     setisTrue(true)
    // }

    const onCheckHandler = () => {
        let update = {
            id: todo.id,
            title: text,
            completed: !todo.completed
        }
        updateData(update)
    }
    return (
        <div>  <li className="todo-item-container" >
            <div className="todo-item">
                <input type="checkbox" checked={todo.completed} onChange={onCheckHandler} />
                {!isEdit && <span onDoubleClick={() => setEdit(true)} className={`todo-item-label ${todo.completed ? "line-through" : ''}`}>
                    {todo.title}
                </span>}
                {isEdit &&
                    <form onSubmit={updateTodoHandler}>
                        <input type="text" className="todo-item-input" value={text} onChange={(e) => setText(e.target.value)} />
                    </form>
                }
            </div>
            {/* delete btn */}
            <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                <svg
                    className="x-button-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </li></div>
    )
}
