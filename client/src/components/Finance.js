import React, { Component } from 'react';
import { useLocation, Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Form,
    Input,
    Button
} from 'reactstrap';
import {
    faFilter,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

class Finance extends Component {
    state = {
        netIncome: null,
        earningsList: [],
        expensesList: [],
        earningDesc: "",
        expenseDesc: "",
        earningValue: null,
        expenseValue: null
    }
    componentDidMount() {
        this.setState({
            earningsList: [
                {name: "Milk", quantity: 20000},
                {name: "Wool", quantity: 10000},
                {name: "Feed", quantity: 30000}
            ],
            expensesList: [
                {name: "Milk", quantity: 20000},
                {name: "Wool", quantity: 10000},
                {name: "Feed", quantity: 30000}
            ]
        });
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    addEarning = () => {
        this.setState({
            earningsList: [...this.state.earningsList, {name: this.state.earningDesc, quantity: parseFloat(this.state.earningValue)}],
            earningDesc: "",
            earningValue: null
        });
    }
    addExpense = () => {
        this.setState({
            expensesList: [...this.state.expensesList, {name: this.state.expenseDesc, quantity: parseFloat(this.state.expenseValue)}],
            expenseDesc: "",
            expenseValue: null
        });
    }
    removeEarning = e => {
        console.log(e);
    }
    removeExpense = e => {
        console.log(e)
    }
    render() {
        let netExpenses = 0;
        let netEarnings = 0;
        this.state.expensesList.forEach(element => netExpenses = netExpenses + element.quantity);
        this.state.earningsList.forEach(element => netEarnings = netEarnings + element.quantity);
        const earnings = this.state.earningsList.map((e, i) => 
            <div className="fin-record">
                <div className="fin-container">
                    <div className="fin-record-name">{ e.name }</div>
                    <div className="fin-record-quantity">{ e.quantity }</div>
                    <FontAwesomeIcon id={i} onClick={ this.removeEarning } className="fin-inner-icon" icon={ faTimes } size="1x" />
                </div>
            </div>
        );
        const expenses = this.state.expensesList.map((e, i) => 
            <div className="fin-record">
                <div className="fin-container">
                    <div className="fin-record-name">{ e.name }</div>
                    <div className="fin-record-quantity">{ e.quantity }</div>
                    <FontAwesomeIcon key={i} onClick={ this.removeExpense } className="fin-inner-icon" icon={ faTimes } size="1x" />
                </div>
            </div>
        );
        return (
            <div>
                <p className="fin-head-text">Financial Summary</p>
                <div className="fin-earnings">
                    <div className="fin-top">
                        <p className="fin-text">Earnings</p>
                        <Link>
                            <FontAwesomeIcon className="fin-icon" icon={ faFilter } size="2x" />
                        </Link>
                    </div>
                    { earnings }
                    <div className="fin-add row">
                        <div className="fin-temp col-md-5">
                            <Input 
                                type="text"
                                value={ this.state.earningDesc }
                                className="fin-input"
                                onChange={ this.onChange }
                                id="earningDesc"
                                placeholder="Description" />
                        </div>
                        <div className="fin-temp col-md-5">
                            <Input 
                                type="text"
                                value={ this.state.earningValue }
                                className="fin-input"
                                onChange={ this.onChange }
                                id="earningValue"
                                placeholder="0" />
                        </div>
                        <div className="fin-temp col-sm-4 col-md-2">
                            <Button onClick={ this.addEarning } className="fin-button">Add</Button>
                        </div>
                    </div>
                </div>
                <div className="fin-expenses">
                    <div className="fin-top">
                        <p className="fin-text">Expenditure</p>
                        <Link>
                            <FontAwesomeIcon className="fin-icon" icon={ faFilter } size="2x" />
                        </Link>
                    </div>
                    { expenses }
                    <div className="fin-add row">
                        <div className="fin-temp col-md-5">
                            <Input 
                                type="text"
                                value={ this.state.expenseDesc }
                                onChange={ this.onChange }
                                className="fin-input"
                                id="expenseDesc"
                                placeholder="Description" />
                        </div>
                        <div className="fin-temp col-md-5">
                            <Input 
                                type="text"
                                value={ this.state.expenseValue }
                                onChange={ this.onChange }
                                className="fin-input"
                                id="expenseValue"
                                placeholder="0" />
                        </div>
                        <div className="fin-temp col-sm-4 col-md-2">
                            <Button onClick={ this.addExpense } className="fin-button">Add</Button>
                        </div>
                    </div>
                </div>
                <div className="fin-net-earnings">
                    <div className="main-container">
                        <p className="fin-net-text">Net Earnings:</p>
                        <p className="fin-net-quantity">{ netEarnings }</p>
                    </div>
                </div>
                <div className="fin-net-expenses">
                    <div className="main-container">
                        <p className="fin-net-text">Net Expenditures:</p>
                        <p className="fin-net-quantity">{ netExpenses }</p>
                    </div>
                </div>
                <div className="fin-net">
                    <p className="fin-net-text">Net Income:</p>
                    <p className="fin-net-quantity" style={{float: 'right'}}>Rs. { netEarnings - netExpenses }</p>
                </div>
            </div>
        );
    }
}

export default Finance;