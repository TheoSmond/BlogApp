import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import PostsList from './PostsList'
import NavBar from './NavBar'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <NavBar/>
                    <Switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/" component={PostsList}/>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;