import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Navbar from "./components/navbar.component";
import ProductsList from "./components/products-list.component";
import EditProduct from "./components/edit-product.component";
import CreateProduct from "./components/create-product.component";
//import CreateUser from "./components/create-user.component";
import AuthUser from "./components/auth.component";
import LoginUser from "./components/login.component";
import Hello from "./components/hello.component";
import RecipesList from "./components/recipes-list.component";
import Account from "./components/account.component";

function App() {
  return (
    <Router>
      <div className='main-container'>
        <Navbar /> 
        <Route path ="/" exact component={Hello} />
        <Route path ="/products"  component={ProductsList} />
        <Route path ="/edit/:id" component={EditProduct} />
        <Route path ="/create" component={CreateProduct} />
        <Route path ="/user" component={AuthUser} />
        <Route path ="/login" component={LoginUser} />
        <Route path ="/recipes" component={RecipesList} />
        <Route path ="/account" component={Account} />
      </div>
    </Router>
  );
}

export default App;
