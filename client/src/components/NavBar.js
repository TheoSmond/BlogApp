import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Blog App</span>
                <NavLink to="/">
                    <button className="btn btn-outline-primary">Home</button>
                </NavLink>
                <NavLink to="/register">
                    <button className="btn btn-outline-primary">Register</button>
                </NavLink>
                <NavLink to="/login">
                    <button className="btn btn-outline-primary">Login</button>
                </NavLink>
            </div>
        </nav>
    )

}

export default NavBar;