import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';
import "../App.css";

function SvgWatch() {
    return (
<svg width="36" height="21" viewBox="0 0 36 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M34.5 10.5C34.5 11.5926 33.9374 12.7377 32.8224 13.8925C31.7126 15.042 30.136 16.1133 28.3253 17.0331C24.6886 18.8804 20.3439 20 17.5 20C14.66 20 10.4442 18.8826 6.93703 17.0394C5.19113 16.1219 3.67723 15.0533 2.61299 13.9068C1.54571 12.7569 1 11.6075 1 10.5C1 9.39252 1.54571 8.24307 2.61299 7.09323C3.67723 5.94667 5.19113 4.87811 6.93703 3.96058C10.4442 2.11744 14.66 1 17.5 1C20.3439 1 24.6886 2.1196 28.3253 3.96694C30.136 4.88674 31.7126 5.95802 32.8224 7.10752C33.9374 8.26229 34.5 9.40741 34.5 10.5Z" fill="#FDFCFA" stroke="#626160" stroke-width="2"/>
<ellipse cx="18" cy="11.5" rx="5" ry="4.5" fill="#626160"/>
</svg>
    ) 
}

function SvgEdit() {
    return (
        <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="21" height="19" fill="#FDFCFA" stroke="#626160" stroke-width="2"/>
<rect x="6" y="11.4722" width="12.8971" height="4.35232" transform="rotate(-41.0648 6 11.4722)" fill="#626160"/>
<path d="M4.95862 12.4966L8.14155 15.7648L3.01707 16.6249L4.95862 12.4966Z" fill="#626160"/>
</svg>

    ) 
}

function SvgClean() {
    return (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="3" y="4" width="12" height="15" fill="#626160"/>
<rect y="2" width="18" height="2" fill="#626160"/>
<rect x="6" width="6" height="1" fill="#626160"/>
</svg>

    ) 
}



const Recipe = props => (
    <tr className="recipe">
        <td>{props.recipe.recipe_name}</td>
        <td>
            <Link to={"/edit/" + props.recipe._id}> <SvgWatch/> </Link> 
        </td>
        <td>
            <Link to={"/edit/" + props.recipe._id}> <SvgEdit/></Link> 
        </td>
        <td>
            <Link to={"/edit/" + props.recipe._id}><SvgClean/> </Link> 
        </td>
    </tr>
)

export default class RecipesList extends Component {
    constructor(props) {
        super(props);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.recipesList = this.recipesList.bind(this);

        this.state = { recipes : [] };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/recipes/')
        .then(response => {
            this.setState({recipes: response.data });
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteRecipe(id) {
        axios.delete('http://localhost:3000/recipes/' + id)
            .then( response => { console.log(response.data)});
        this.setState({
            recipes: this.state.recipes.filter(el => el._id !== id)     
        })

    }

    recipesList() {
        return this.state.recipes.map(curRecipe => {
            if (curRecipe.username === JSON.parse(localStorage.getItem('login'))) 
                return <Recipe recipe={curRecipe} deleteRecipe={this.deleteRecipe} key={curRecipe._id} />
            
        });
    } 

    
    render() {
        return (
            <div className="product-list">
                <div className="recipe-header">
                <h3 >Список рецептов</h3>
                <div className="recipe-buttons">
                    <div className="recipe-lable filter-label">Рецепты из имеющихся продуктов</div>
                    <div className="recipe-lable filter-label">Добавить рецепт</div>
                </div>
                </div>
                <table className="table">
                    <tbody>
                    {this.recipesList()}
                    </tbody>
                </table>

            </div>
        )
    }
}