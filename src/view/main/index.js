import React from 'react'
import classnames from 'classnames'
import { TodosContext } from '../../context/todosContext';
import './index.css'

function Main (props) {
    return (
        <TodosContext.Consumer>
            {
                (todos) => {
                    if (todos.size === 0) {
                        return null
                    }
                    return (
                        <section className="main">
                            <ToggleBtn {...props}/>
                            <TodoList {...props}/>
                        </section>
                    )
                }
            }
        </TodosContext.Consumer>
    )
}

function ToggleBtn () {
    const areAllComplete = (todos) => {
        const are = todos.every((todo) => {
            return todo.completed
        })
        return are ? 'checked' : ''
    }
    
    return (
    <TodosContext.Consumer>
        {
            (todos, onToggleAllTodos) => {
                return (
                    <div>
                        <input
                            type="checkbox"
                            className="toggle-all"
                            checked={areAllComplete(todos)}
                            onChange={onToggleAllTodos}
                        />
                        <label htmlFor="toggle-all">
                            Mark all as complete
                        </label>
                    </div>
                )
            }
        }
    </TodosContext.Consumer>
    )
}


function TodoList () {
    return (
        <TodosContext.Consumer>
            {
                (
                    todos,
                    onDeleteTodo,
                    onEditTodo,
                    onToggleTodo
                ) => {
                    return (
                        <ul className="todo-list">
                            {[...todos.values()].reverse().map((todo) => {
                                return (<TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        onDeleteTodo={onDeleteTodo}
                                        onEditTodo={onEditTodo}
                                        onToggleTodo={onToggleTodo}
                                    />)
                            })}
                        </ul>
                    )
                }
            }
        </TodosContext.Consumer>
      
    )
}

class TodoItem extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            editing: false
        }
    }
    
    onStartEditingTodo = (id) => {
        this.setState({ editing: id })
    }
    
    onStopEditingTodo = () => {
        this.setState({ editing: '' })
    }
    
    render () {
        const { onStartEditingTodo, onStopEditingTodo, props, state } = this
        const { todo, onToggleTodo, onDeleteTodo, onEditTodo } = props
        const { editing } = state
        const isEditing = editing === todo.id
        
        const onStartEditing = () => {
            onStartEditingTodo(todo.id)
        }
        const onToggle = () => {
            onToggleTodo(todo.id)
        }
        const onChange = (e) => {
            onEditTodo(todo.id, e.target.value)
        }
        const onKeydown = (e) => {
            const ENTER_KEY_CODE = 13
            if (e.keyCode === ENTER_KEY_CODE) {
                onStopEditingTodo()
            }
        }
        
        const onDelete = e => {
            onDeleteTodo(todo.id)
        }
        
        let input = null
        if (isEditing) {
            
            input =
              <input
                type="text"
                autoFocus={true}
                className="edit"
                value={todo.text}
                onBlur={onStopEditingTodo}
                onChange={onChange}
                onKeyDown={onKeydown}
              />
        }
        
        return (
          <li
            className={classnames({
                completed: todo.complete,
                editing: isEditing,
            })}
          >
              <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={todo.complete}
                    onChange={onToggle}
                  />
                  <label onDoubleClick={onStartEditing}>
                      {todo.text}
                  </label>
                  <button className="destroy" onClick={onDelete}/>
              </div>
              {input}
          </li>
        )
    }
}

export default Main