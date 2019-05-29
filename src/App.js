import React, { Component } from 'react'
import NavBar from './components/NavBar/NavBar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import DepartmentTable from './components/Manager/DepartmentTable'
import AccountTable from './components/Manager/AccountTable'
import FieldCheckbox from './components/Manager/ReseachTable'
import UserProfile from './components/User/Profile'
import Home from './components/Home/Home'
import viewTeacherTable from './components/Teacher/viewTeacher'
import Footer from './components/Footer/Footer'
import viewDepartmentTable from './components/Department/viewDepartment'
import UserChangePassword from './components/User/ChangePassword'

export class App extends Component {
    state = {

    }

    render() {
        return (
            <BrowserRouter>
                <div style={{minHeight: '90vh'}}>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/manage/departments" component={DepartmentTable}/>
                        <Route path="/manage/users" component={AccountTable}/>
                        <Route path='/user/profile' component={UserProfile}/>
                        <Route path='/user/fields' component={FieldCheckbox}/>
                        <Route path='/user/password' component={UserChangePassword}/>
                        <Route path='/teachers' component={viewTeacherTable}/>
                        <Route path='/departments' component={viewDepartmentTable}/>
                        {/* <Route path='/teacher/:id' component={TeacherProfile}/> */}
                    </Switch>
                </div>
                <Footer />
            </BrowserRouter>
        )
    }
}

export default App
