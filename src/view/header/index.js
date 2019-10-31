import React, {useState, useContext} from 'react'
import './index.css'
import { TodosContext } from '../../context/todosContext';

function Header () {
    return (
      <header className='header'>
          <h1 className='title'>Todos</h1>
          <NewTodo/>
      </header>
    )
}

function NewTodo(props) {
    const [
        draft,
        setDraft
    ] = useState('')
    const { todos, onAdd } = useContext(TodosContext)

    // 停止编辑
    const onBlur = () => {
        onAdd(draft, todos)
        setDraft('')
    }

    // 编辑完成
    const onKeyDown = (e) => {
        const ENTER_KEY_CODE = 13
        if (e.keyCode === ENTER_KEY_CODE) {
            onAdd(draft, todos)
            setDraft('')
        }
    }

    return (
        <input
            className="new-todo"
            type="text"
            autoFocus='autoFocus'
            placeholder="What needs to be done?"
            value={draft}
            onBlur={onBlur}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
        />
    )
}


export default Header
