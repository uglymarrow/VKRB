import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import axios from 'axios';
import "../App.css"

export default class Account extends Component {
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
                    <h3>Личный кабинет</h3>
                    <div className="account-row">
                        Логин : {JSON.parse(localStorage.getItem('login'))}
                    </div>   
                    <div className="account-row-red">
                        Сменить логин
                    </div>  
                    <div className="account-row-red">
                        Сменить пароль
                    </div>     
                </div>
            </div>
        )
    }
}