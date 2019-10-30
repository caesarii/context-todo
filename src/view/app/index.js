import React, { Component } from 'react'
import Immutable from 'immutable'
import Counter from '../../utils/Counter'
import Todo from '../../utils/Todo'
import Header from '../header'
import Main from '../main'
import Footer from '../footer'
import './index.css'

 
const onAdd = (text, todos) => {
    if (text === '') {
        return
    }
    const id = Counter.increment()
    const todo = new Todo({
        id,
        text: text,
        complete: false,
    })
    
    todos.push(todo)
    return todos
}

const onDeleteTodo = (id, todos) => {
    todos = todos.filter(t => {
        if(t.id !== id) {
            return t
        }
    })
    return {todos}
}

const onEditTodo = (id, text, todos) => {
    const todos = prev.todos
    todos.forEach(t => {
        if(t.id === id) {
            t.text = text
        }
    })
    return {todos}
}

const onToggleTodo = (id, todos) => {
    todos = todos.map(t => {
        if(t.id === id) {
            const completed = t.complete
            t.complete = !completed
        }
        return t
    })
    return {todos}
}

const onToggleAllTodos = (todos) => {
    const todos = prev.todos.map(t => {
        t.complete = !t.complete
        return t
    })
    return {todos}
}

const onDeleteCompletedTodos = (todos) => {
    const todos = prev.todos.filter(t => {
        if(!t.complete) {
            return t
        }
    })
    return {todos}
}
const TodosContext = React.createContext(
    {
        toods: [],
        onAdd,
        onDeleteTodo,
        onEditTodo,
        onToggleTodo,
        onToggleAllTodos,
        onDeleteCompletedTodos,
    }
)
const editingContext = React.createContext(false)
const draftContext = React.createContext(null)

class AppView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editing: false,
            draft: null,
        }
        
    }
   
    render () {
        const { todos } = this.state
        const { onAdd, onUpdateDraft, onDeleteTodo, onEditTodo, onToggleTodo, onToggleAllTodos, onDeleteCompletedTodos} = this
        const props = {
            todos,
            onAdd,
            onUpdateDraft,
            onToggleAllTodos,
            onDeleteTodo,
            onEditTodo,
            onToggleTodo,
            onDeleteCompletedTodos,
        }
        
        return (
          <div className="container">
              <div className="todoapp">
                  <Header {...props} />
                  <Main {...props} />
                  <Footer {...props} />
              
              </div>
              <div className="info">
                  <p>Double-click to edit a todo</p>
                  <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
              </div>
          </div>
        
        )
    }
}

export default AppView
