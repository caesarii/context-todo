import React, { Component } from 'react'
import Immutable from 'immutable'
import Counter from '../../utils/Counter'
import Todo from '../../utils/Todo'
import Header from '../header'
import Main from '../main'
import Footer from '../footer'
import { todos, todosContext } from '../../context/todosContext'
import './index.css'

 
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
        return (
          <div className="container">
              <TodosContext.Provider value={todos}>
                <div className="todoapp">
                    <Header {...props} />
                    <Main {...props} />
                    <Footer {...props} />
                </div>
              </TodosContext.Provider>
              <div className="info">
                  <p>Double-click to edit a todo</p>
                  <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
              </div>
          </div>
        
        )
    }
}

export default AppView
