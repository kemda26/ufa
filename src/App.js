import React, { Component } from 'react'
import NavBar from './components/NavBar/NavBar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import DepartmentTable from './components/Manager/DepartmentTable'
import AccountTable from './components/Manager/AccountTable'
import FieldCheckbox from './components/Manager/ReseachTable'
import UserProfile from './components/User/Profile'
import Home from './components/Home/Home'
import viewTeacherTable from './components/Teacher/viewTeacher'
import editTeacherTable from './components/Manager/TeacherTable'
import viewDepartmentTable from './components/Department/viewDepartment'

export class App extends Component {
    state = {

    }

    render() {
        return (
            <BrowserRouter>
                <div style={{ height: '100%' }}>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/manage/departments" component={DepartmentTable}/>
                        <Route path="/manage/users" component={AccountTable}/>
                        {/* <Route path="/manage/teachers" component={editTeacherTable}/> */}
                        <Route path='/user/profile' component={UserProfile}/>
                        <Route path='/user/fields' component={FieldCheckbox}/>
                        <Route path='/teachers' component={viewTeacherTable}/>
                        <Route path='/departments' component={viewDepartmentTable}/>
                        {/* <Route path='/teacher/:id' component={TeacherProfile}/> */}
                    </Switch>
                    {/* <TeacherProfile/> */}
                </div>
            </BrowserRouter>
        )
    }
}

export default App
