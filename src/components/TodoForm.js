import React, { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
    const [text, setText] = useState("");

    let data = {
        id: Math.floor(Math.random() * 999),
        title: text,
        completed: false
    }
    const handleChange = (e) => {
        e.preventDefault();
        addTodo(data)
        setText("")
    }

    return (
        <div> <form action="#" onSubmit={handleChange}>
            <input
                type="text"
                className="todo-input"
                placeholder="What do you need to do?"
                onChange={e => setText(e.target.value)}
                value={text}
            />
        </form></div>
    )
}
