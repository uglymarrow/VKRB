import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

function SvgDrop() {
    return (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" className = "svg-drop">
<g filter="url(#filter0_d)">
<path d="M4 2.5H33" stroke="#FDFCFA" stroke-width="5"/>
</g>
<g filter="url(#filter1_d)">
<path d="M4 15H33" stroke="#FDFCFA" stroke-width="5"/>
</g>
<g filter="url(#filter2_d)">
<path d="M4 26H33" stroke="#FDFCFA" stroke-width="5"/>
</g>
<defs>
<filter id="filter0_d" x="0" y="0" width="37" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter1_d" x="0" y="12.5" width="37" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter2_d" x="0" y="23.5" width="37" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>

    )
}


class IsLogged extends React.Component {
    state = {dropClick : true}

    handleClick = () => {
        this.setState({ dropClick: !this.state.dropClick });
       }

    render() {
        return (
        <nav className="navbar  bg-green navbar-expand-lg">
            
            <div className="navbar-hungry" href="#"  onClick={this.handleClick}>
            <SvgDrop />
            <div className={this.state.dropClick ? "drop-close" : "drop-open"}>

            <ul className="drop-links">
                <li className="drop-item">
                    <Link to="/products" className="nav-link">Список продуктов</Link>
                </li>
                {/* <li className="drop-item">
                    <Link to="/create" className="nav-link">Новый продукт</Link>
                 </li>*/}
                <li className="drop-item">
                    <Link to="/recipes" className="nav-link">Список рецептов</Link> 
                </li>
                <li className="drop-item">
                    <Link to="/account" className="nav-link">Личный кабинет</Link>
                 </li> 
                <li className="drop-item">
                <a className="nav-link" href="#"  onClick={() => {localStorage.clear(); window.location = '/';}}>
                    Выход
                </a>    
                </li>     

            </ul>
            </div>
            </div>    
            
            
            <Link to="/products" className="navbar-hungry"> I'M HUNGRY </Link> 
            <div className="  nav-links">
                <ul className="navbar-nav is-logged mr-auto">
                    <li className="navbar-item">
                        <Link to="/products" className="nav-link">Список продуктов</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/recipes" className="nav-link">Список рецептов</Link> 
                    </li>
                    <li className="navbar-item">
                        <Link to="/account" className="nav-link">Личный кабинет</Link>
                    </li>
                    <li className="navbar-item">
                    <a className="nav-link" href="#"  onClick={() => {localStorage.clear(); window.location = '/';}}>
                        Выход
                    </a>    
                    </li>              
                </ul>
            </div>
        </nav>
        )
    }
}

function NotLogged(props) {
    return (
        <nav className="navbar  bg-green navbar-expand-lg">
            <Link to="/" className="navbar-hungry"> I'M HUNGRY </Link>
            <div className="nav-links">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Регистрация</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link">Вход</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.localStorageUpdated = this.localStorageUpdated.bind(this);
        
        this.state = {
            login: null,
            dropOpen: false
        }
    }
   
    componentDidMount() {
        if (typeof window !== 'undefined') {
            this.setState({login: localStorage.getItem('login') ? true : false})

            window.addEventListener('storage', this.localStorageUpdated)
        }
    }
    
    localStorageUpdated(){
        if (!localStorage.getItem('login')) {
            this.updateState(false)
        } 
        else if (!this.state.status) {
            this.updateState(true)
        }
    }

    render() {
        if (! this.state.login)
            return < NotLogged/>
        else
            return <IsLogged/> 
    };
}











/*
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
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Регистрация</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">Вход</Link>
                        </li>
                        <li className="navbar-item">
                        <a className="nav-link" href="#"  onClick={() => {localStorage.clear()}}>
                            Выход
                        </a>    
                        </li>
                    </ul>
                </div>
            </nav>
        );
    };
} */