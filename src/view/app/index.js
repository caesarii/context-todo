import React, { Component, useState } from 'react'
import Immutable from 'immutable'
import Counter from '../../utils/Counter'
import Todo from '../../utils/Todo'
import Header from '../header'
import Main from '../main'
import Footer from '../footer'
import { TodosContext } from '../../context/todosContext'
import './index.css'

function AppView() {
    let [todos, setTodo] = useState([])

    const onAdd = (text) => {
        if (text === '') {
            return
        }
        const id = Counter.increment()
        const todo = new Todo({
            id,
            text: text,
            complete: false,
        })
        todos = [...todos, todo]
        setTodo(todos)
    }

    const onDeleteTodo = (id) => {
        todos = todos.filter(t => {
            if(t.id !== id) {
                return t
            }
        })
        setTodo(todos)
    }

    const onEditTodo = (id, text) => {
        todos.forEach(t => {
            if(t.id === id) {
                t.text = text
            }
        })
        setTodo(todos)
    }

    const onToggleTodo = (id) => {
        todos = todos.map(t => {
            if(t.id === id) {
                const completed = t.complete
                t.complete = !completed
            }
            return t
        })
        setTodo(todos)
    }

    const onToggleAllTodos = () => {
        todos = todos.map(t => {
            t.complete = !t.complete
            return t
        })
        setTodo(todos)
    }

    const onDeleteCompletedTodos = () => {
        todos = todos.filter(t => {
            if(!t.complete) {
                return t
            }
        })
        setTodo(todos)
    }

    const context = {
        todos,
        onAdd,
        onDeleteTodo,
        onEditTodo,
        onToggleTodo,
        onToggleAllTodos,
        onDeleteCompletedTodos
    }

    return (
        <div className="container">
            <TodosContext.Provider value={context}>
                <div className="todoapp">
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </TodosContext.Provider>
            <div className="info">
                <p>Double-click to edit a todo</p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </div>
        </div>

    )
}

export default AppView
