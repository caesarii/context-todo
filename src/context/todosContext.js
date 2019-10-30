
import React from 'react'
import Counter from '../utils/Counter'
import Todo from '../utils/Todo'

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
    todos = todos.map(t => {
        t.complete = !t.complete
        return t
    })
    return {todos}
}

const onDeleteCompletedTodos = (todos) => {
    todos = todos.filter(t => {
        if(!t.complete) {
            return t
        }
    })
    return {todos}
}
export const todos = [];
export const TodosContext = React.createContext(
    {
        todos,
        onAdd,
        onDeleteTodo,
        onEditTodo,
        onToggleTodo,
        onToggleAllTodos,
        onDeleteCompletedTodos,
    }
)