import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../App.css"

export default class AuthUser extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this); 
        this.onChangePassword = this.onChangePassword.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        }

        console.log(user);

        localStorage.setItem('login', JSON.stringify(this.state.username));

        axios.post('http://localhost:3000/users/add', user)
            .then(response => console.log(response.data));

        this.setState (
            {
            username: '',
            password: ''
            }
        )

        window.location = '/products';
        
    }


    render() {
        return (
            <div className = "auth-form" >
                <div className="auth-container">
                <h3>Регистрация</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Логин:</label>
                        <input
                            type="email"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>  
                    <div className="form-group">
                        <label>Пароль:</label>
                        <input
                            type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>  
                    <div className="form-group">
                        <input type="submit" value="Зарегистрироваться" className="btn green-btn" />
                    </div>      
                </form>
                
                <Link className="green-link" to="/login">Уже есть учетная запись?</Link>
                </div>
            </div>
        )
    }
}