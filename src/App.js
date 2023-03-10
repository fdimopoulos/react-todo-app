import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash, FaCheck } from "react-icons/fa"
import './App.css';

function App() {
    const [todo, setTodo] = useState("");      // todo = each individual task
    const [todos, setTodos] = useState(() => {
        // get the todos from localstorage
        const savedTodos = localStorage.getItem("todos");
        // if there are todos stored
        if (savedTodos) {
          // return the parsed JSON object back to a javascript object
          return JSON.parse(savedTodos);
          // otherwise
        } else {
          // return an empty array
          return [];
        }
    });
    
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            id: uuidv4(),   // create unique id
            text: todo,
            completed: false
        }
        
        {todo && setTodos([...todos].concat(newTodo))};  // if the input is not empty then add the new task to the existing list
        setTodo("");    // reset input after submitting the form
    }

    const deleteTodo = (id) => {
        const updatedTodos = [...todos].filter((todo) => todo.id !== id)    // return only the values where the todo.id is not equal to id
                                                                            // this will be true for every todo except the one we are deleting
        setTodos(updatedTodos);
    }

    const completeTodo = (id) => {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(updatedTodos);
    }

    return (
        <div className="app">
            <h1>To-Do List App</h1>
            {new Date().toLocaleDateString("en-GB", {
                dateStyle: "full"
            })}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    onChange={handleChange} 
                    value={todo}    // the value of input is the value of todo
                />
                <button type="submit">Add Task</button>
            
            {todos.map((todo) => 
                <div key={todo.id} className="todos-container">
                    <div className={todo.completed ? 'todo completed' : 'todo'}>
                        {todo.text}
                        <div className='todo-btn'>
                            <FaCheck className='btn-complete' onClick={() => completeTodo(todo.id)}/>
                            <FaTrash className='btn-delete' onClick={() => deleteTodo(todo.id)}/>
                        </div>
                    </div>
                </div>)}
                </form>
        </div>
    );
}

export default App;
