import React from 'react'
import { TodosContext } from '../../context/todosContext';
import './index.css'

function Footer() {
    return (
        <TodosContext.Consumer>
            {
                ({ todos, onDeleteCompletedTodos }) => {
                    if(todos.size === 0) {
                        return null
                    }
                    const remaining = todos.filter((todo) => {
                        return !todo.complete
                    }).length
                    const completed = todos.length - remaining
                    const phrase = remaining === 1 ? ' item left' : ' items left'
                
                    let clearCompletedButton = null
                    if(completed > 0) {
                        clearCompletedButton =
                            <button
                                className='clear-completed'
                                onClick={onDeleteCompletedTodos}
                            >
                               Clear completed ({completed})
                            </button>
                    }
                    return (
                        <footer className="footer">
                            <span className="todo-count">
                                <strong>
                                    {remaining}
                                </strong>
                                {phrase}
                            </span>
                            {clearCompletedButton}
                        </footer>
                    )
                }
            }
            
        </TodosContext.Consumer>
    )
}

export default Footer