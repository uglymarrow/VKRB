import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from "react-router-dom";
//import {Link} from 'react-router-dom';
//import axios from 'axios';
import "../App.css";

//import Navbar from "./navbar.component";


export default class Hello extends Component {
    //constructor(props) {super(props);} 
    
    render() {
        return (            
            <div className="hello-container">
                <p>Все сталкиваются с ситуацией, когда 
                приходится выбрасывать продукты с истекшим сроком годности.
                </p>
                <p>Часто это происходит из-за того, что о наличии 
                какого-либо продукта дома человек забывает, либо же вспоминает слишком поздно,
                когда срок годности уже истёк. 
                </p>
                <p>Такой неприятности можно легко избежать используя данное
                приложение.</p>
            </div>
        )
    }
}