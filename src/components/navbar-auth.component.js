import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../App.css"


export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar  bg-green navbar-expand-lg">
                <Link to="/" className="navbar-hungry"> I'M HUNGRY </Link>
                <div className="  nav-links">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/products" className="nav-link">Список продуктов</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create product log</Link>
                        </li>
                         if (localStorage.empty) return (
                        <li className="navbar-item">
                        <a className="nav-link" href="#"  onClick={() => {localStorage.clear()}}>
                            Выход
                        </a>    
                        </li>
                        )
                    </ul>
                </div>
            </nav>
        );
    };
}

function UserAuth() {
    return (

    )
}

function NotAuth() {
    return (
        
    )
}