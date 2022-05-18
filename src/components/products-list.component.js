import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "../App.css";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { isPast } from 'date-fns/esm';

function createExpire(str) {
    var year = parseInt(str.substring(0,4));
    var month = parseInt(str.substring(6,7) - 1);
    var day = parseInt(str.substring(8,10)) + 1;
    var ex = new Date(year, month, day);
    var expire = parseInt(formatDistanceToNowStrict(ex, {unit: 'day', addSuffix: true}).substring(3,6));
    var color = 'tr-green';
    if ((expire <= 10) && (expire > 3)) color = 'tr-yellow';
    if (expire <= 3) color = 'tr-red';
    if (isPast(ex)) color = 'tr-black';
    var answer;
    if (expire === 0) {
        answer = 'Истекает сегодня';
        color = 'tr-red'
    } else {
        answer = formatDistanceToNow(ex, {locale: ruLocale, addSuffix: true});
    }
    if (answer.includes('час')) answer = "Срок годности истёк вчера";
    return ([answer, color])
}

const Product = props => (
    <tr className={createExpire(props.product.exdate.substring(0,10))[1]}>
        <td>{props.product.prodname}</td>
        <td>{createExpire(props.product.exdate.substring(0,10))[0]}</td>
        <td>{props.product.quantity}</td>
        {/*<td>{props.product.exdate.substring(0,10)}</td>*/}
        <td>
            <Link to={"/edit/" + props.product._id}>   
            <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="21" height="19" fill="#FDFCFA" stroke="#626160" strokeWidth="2"/>
<rect x="6" y="11.4722" width="12.8971" height="4.35232" transform="rotate(-41.0648 6 11.4722)" fill="#626160"/>
<path d="M4.95862 12.4966L8.14155 15.7648L3.01707 16.6249L4.95862 12.4966Z" fill="#626160"/>
</svg>
            </Link>

        </td>
        <td>
            <a href="#" onClick={() => {props.deleteProduct(props.product._id)}}> 
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="12" height="15" fill="#626160"/>
                <rect y="2" width="18" height="2" fill="#626160"/>
                <rect x="6" width="6" height="1" fill="#626160"/>
                </svg>           
            </a>

        </td>
    </tr>
)

export default class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.productsList = this.productsList.bind(this);

        this.state = { products : [] };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/products/')
        .then( response => {
            this.setState({ products: response.data });
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteProduct(id) {
        axios.delete('http://localhost:3000/products/' + id)
            .then( response => { console.log(response.data)});
        this.setState({
            products: this.state.products.filter(el => el._id !== id)     
        })

    }

    productsList() {
        return this.state.products.map(curProduct => {
            if (curProduct.username === JSON.parse(localStorage.getItem('login'))) 
                return <Product product={curProduct} deleteProduct={this.deleteProduct} key={curProduct._id} />
            
        });
    } 

    
    render() {
        return (
            <div className="product-list">
                <h3>Список продуктов</h3>
                <table className="table">
                    <thead >
                        <tr>
                            <th>Наименование</th>
                            <th>Дней до истечения срока годности</th>
                            <th>Количество</th>
                            {/*<th>Exdate</th>*/}
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.productsList() }
                    </tbody>
                </table>
            <div className="add-product-button">
            <Link to="/create">
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="37" cy="37" r="37" fill="#299817"/>
<rect x="32" y="16" width="9" height="41" fill="#FFFDFD"/>
<rect x="16" y="41" width="9" height="41" transform="rotate(-90 16 41)" fill="#FFFDFD"/>
</svg>
            </Link>
            </div>  
            </div>
        )
    }
}