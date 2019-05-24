import React, { Component } from 'react'
import NavBar from './components/NavBar/NavBar'
import DepartmentTable from './components/Manager/DepartmentTable'
import AccountTable from './components/Manager/AccountTable'
import ResearchTable from './components/Manager/ReseachTable'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export class App extends Component {
    state = {

    }

    render() {

        return (
            <Router>
                <div style={{ height: '100%' }}>
                    <NavBar />
                    {/* <DepartmentTable /> */}
                    {/* <AccountTable />  */}
                    <Route path="/manage/departments" component={DepartmentTable} />
                    <ResearchTable /> 
                </div>
            </Router>
        )
    }
}

export default App
