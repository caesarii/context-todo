import React, { Component } from 'react'
import Immutable from 'immutable'


import Header from '../header'
import Main from '../main'
import Footer from '../footer'
import { todos, TodosContext } from '../../context/todosContext'
import './index.css'

class AppView extends Component {
    constructor (props) {
        super(props)
    }
   
    render () {
        return (
          <div className="container">
              <TodosContext.Provider value={todos}>
                <div className="todoapp">
                    {/* <Header {...props} /> */}
                    <Main />
                    {/* <Footer {...props} /> */}
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
