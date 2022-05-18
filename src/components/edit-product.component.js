import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class EditProducts extends Component {
    constructor(props){
        super(props);

        this.userInput = React.createRef();

        this.onChangeUsername = this.onChangeUsername.bind(this); 
        this.onChangeProdname = this.onChangeProdname.bind(this);
        this.onChangeProddate = this.onChangeProddate.bind(this);
        this.onChangeExdate = this.onChangeExdate.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            prodname: '',
            proddate: new Date(),
            exdate: new Date(),
            quantity: 0,
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/products/' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    username: response.data.username,
                    prodname: response.data.prodname,
                    proddate: new Date(response.data.proddate),
                    exdate: new Date(response.data.exdate),
                    quantity: response.data.quantity
                })
            })
            .catch(error => console.log(error));

        axios.get('http://localhost:3000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users : response.data.map(user => user.username),
                })
            }
        })    
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeProdname(e) {
        this.setState({
            prodname: e.target.value
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

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const product = {
            username: this.state.username,
            prodname: this.state.prodname,
            proddate: this.state.proddate,
            exdate: this.state.exdate,
            quantity: this.state.quantity,
            category: this.state.category
        }

        console.log(product);

        axios.post('http://localhost:3000/products/update/' + this.props.match.params.id, product)
            .then(response => console.log(response.data));

        window.location = '/products';
    }

    render() {
        return (
            <div>
                <h3>Edit product log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
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
                    </div>
                    <div className="form-group">
                        <label>Prodname:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.prodname}
                            onChange={this.onChangeProdname}
                        />
                    </div>   
                    <div className="form-group">
                        <label>Proddate:</label>
                        <div>
                            <DatePicker
                                selected={this.state.proddate}
                                onChange={this.onChangeProddate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Exdate:</label>
                        <div>
                            <DatePicker
                                selected={this.state.exdate}
                                onChange={this.onChangeExdate}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Количество</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.quantity}
                            onChange={this.onChangeQuantity}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit product" className="btn btn-primary" />
                    </div>      
                </form>
            </div>
        )
    }
}