import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import "../App.css"
import axios from 'axios';

function SvgCamera() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill="#C4C4C4"/>
<rect x="12" y="14" width="24" height="21" fill="#626160"/>
<rect x="19" y="11" width="10" height="6" fill="#626160"/>
<circle cx="23.5" cy="24.5" r="5.5" fill="#C4C4C4"/>
</svg>
    )
}

export default class CreateProducts extends Component {
    constructor(props){
        super(props);

        this.userInput = React.createRef();

//      this.onChangeUsername = this.onChangeUsername.bind(this); 
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeProdname = this.onChangeProdname.bind(this);
        this.onChangeProddate = this.onChangeProddate.bind(this);
        this.onChangeExdate = this.onChangeExdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
//          username: '',
            prodname: '',
            proddate: new Date(),
            exdate: new Date(),
 //           users: []
            quantity: 1,
            category: ''
        }
    }

/*    componentDidMount() {
        axios.get('http://localhost:3000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users : response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    } */

/*    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    } */

    onChangeProdname(e) {
        this.setState({
            prodname: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeProddate(date) {
        this.setState({
            proddate: date
        });
    }

    onChangeExdate(date) {
        this.setState({
            exdate: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const product = {
            username: JSON.parse(localStorage.getItem('login')),
            prodname: this.state.prodname,
            proddate: this.state.proddate,
            exdate: this.state.exdate,
            quantity: this.state.quantity,
            category: this.state.category
        }

        console.log(product);

        axios.post('http://localhost:3000/products/add', product)
            .then(response => console.log(response.data));

        window.location = '/products';
    }

    render() {
        return (
            <div className="auth-container">
                <h3>Новый продукт</h3>
                <form onSubmit={this.onSubmit} className="auth-form">
                 { /*  <div className="form-group">
                        <label>Username:</label>
                        <select ref={this.userInput}
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {
                                this.state.users.map((user) => {
                                    return (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    )   
                                })
                            }
                        </select>
                        </div> */}
                    <div className="form-group">
                        <label >Наименование продукта:</label>
                        <div className="create-name">
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.prodname}
                            onChange={this.onChangeProdname}
                        />
                        <SvgCamera />
                        </div>
                    </div>   
                    <div className="form-group">
                        <label>Дата изготовления:</label>
                        <div>
                            <DatePicker
                                selected={this.state.proddate}
                                onChange={this.onChangeProddate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Годен до:</label>
                        <div>
                            <DatePicker
                                selected={this.state.exdate}
                                onChange={this.onChangeExdate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="create-lable">Не знаете когда истекает срок годности?</label>
                        <label className="create-lable">Выберите категорию продукта:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.category}
                            onChange={this.onChangeCategory}
                        />
                    </div>
                    <div>
                        <label>Количество</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.quantity}
                            onChange={this.onChangeCategory}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Добавить" className="green-btn" />
                    </div>      
                </form>
            </div>
        )
    }
}