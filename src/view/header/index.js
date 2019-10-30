import React from 'react'
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

class NewTodo extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            draft: '',
        }
    }
    
    // 编辑
    onChange = (e) => {
        this.setState({ draft: e.target.value })
    }
    onOver = () => {
        this.setState({ draft: '' })
    }
    
    
    render () {
        const { state, onBlur, onChange, onKeyDown } = this
        const { draft } = state
        return (
            <TodosContext.Consumer>
                {
                    ({ todos, onAdd }) => {

                        // 停止编辑
                        const onBlur = () => {
                            onAdd(this.state.draft, todos)
                            this.onOver()
                        }
                        
                        // 编辑完成
                        const onKeyDown = (e) => {
                            const ENTER_KEY_CODE = 13
                            if (e.keyCode === ENTER_KEY_CODE) {
                                onAdd(this.state.draft, todos)
                                this.onOver()
                                
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
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                            />
                        )
                    }
                }
            </TodosContext.Consumer>
        )
    }
}

export default Header