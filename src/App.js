import './reset.css';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Remain } from './components/Remain';
import { Filter } from './components/Filter';
import { ClearComplete } from './components/ClearComplete';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [filterTodo, setFilterTodo] = useState(todos);

  const addTodo = (todos) => {
    // add data to server side
    fetch("http://localhost:2888/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todos)
    })
    // add data in local ui
    setTodos(pre => [...pre, todos])
  }
  const deleteData = (todoId) => {
    // delete to server side
    fetch(`http://localhost:2888/todo/${todoId}`, {
      method: "delete"
    })
    // client side delete
    setTodos(preState => {
      return preState.filter(todo => {
        return todo.id != todoId
      });
    })
  }
  const updateTodo = (data) => {
    fetch(`http://localhost:2888/todo/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    // client side update
    setTodos(preState => {

      return preState.map((t) => {
        if (t.id == data.id) { return data }
        return t
      });
    })
  }
  let count = todos.filter(data => !data.completed).length;

  // checkall
  const CheckAll = () => {
    // server side
    todos.forEach(t => {
      t.completed = true;
      updateTodo(t)
    })
    // client side
    setTodos(preState => {
      return preState.map(t => {
        // set all todos to true ...is to get all todos.
        return { ...t, completed: true }
      })
    })
  }
  let clearCompleted = () => {
    // server
    todos.forEach(t => {
      if (t.completed) {
        deleteData(t.id)
      }
    })
    // client
    setTodos(preState => {
      return preState.filter(t => !t.completed)
    })
  }
  useEffect(() => {
    fetch("http://localhost:2888/todo")
      .then(res => res.json())
      .then(todos => { setTodos(todos); setFilterTodo(todos) })
      .catch(e => { console.log(e); })
  }, [])

  let filterBy = useCallback((filter) => {
    if (filter == 'all') {
      setFilterTodo(todos);
    }
    if (filter == 'active') {
      setFilterTodo(todos.filter(t => !t.completed))
    }
    if (filter == 'completed') {
      setFilterTodo(todos.filter(t => t.completed))
    }
  }, [todos])
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={filterTodo} deleteTodo={deleteData} updateTodo={updateTodo} />
        <Remain RemainingCount={count} CheckAll={CheckAll} />

        <div className="other-buttons-container">
          <Filter filterby={filterBy} />
          <ClearComplete clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
