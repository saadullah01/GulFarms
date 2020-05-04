import React, { Component } from 'react';
import { useLocation, Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

class Finance extends Component {
    state = {
        netIncome: null,
        earningsList: [],
        expensesList: []
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
                    <Link><FontAwesomeIcon className="fin-inner-icon" icon={ faTimes } size="1x" /></Link>
                </div>
            </div>
        );
        const expenses = this.state.expensesList.map((e, i) => 
            <div className="fin-record">
                <div className="fin-container">
                    <div className="fin-record-name">{ e.name }</div>
                    <div className="fin-record-quantity">{ e.quantity }</div>
                    <Link><FontAwesomeIcon className="fin-inner-icon" icon={ faTimes } size="1x" /></Link>
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
                </div>
                <div className="fin-expenses">
                    <div className="fin-top">
                        <p className="fin-text">Expenditure</p>
                        <Link>
                            <FontAwesomeIcon className="fin-icon" icon={ faFilter } size="2x" />
                        </Link>
                    </div>
                    { expenses }
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