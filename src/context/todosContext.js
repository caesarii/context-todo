
import React from 'react'

const todosContext = {
    todos: [],
    onAdd: () => {},
    onDeleteTodo: () => {},
    onEditTodo: () => {},
    onToggleTodo: () => {},
    onToggleAllTodos: () => {},
    onDeleteCompletedTodos: () => {}
}
export const TodosContext = React.createContext(
    todosContext
)