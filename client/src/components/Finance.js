import React, { Component } from 'react';
import { useLocation, Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Form,
    Input,
    Button,
    Table
} from 'reactstrap';
import {
    faFilter,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Record(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>Rs. {props.amount}</td>
            <td>{props.quantity}</td>
            <td>{props.unit}</td>
            <td style={{ textAlign: "" }}>
                <FontAwesomeIcon style={{ color: "#4caf50" }} icon={faTimes} size="1x" />
            </td>
        </tr>
    );
}

class Finance extends Component {
    state = {
        netIncome: null,
        incomeList: [],
        expenseList: [],
        eDesc: "",
        eAmount: null,
        eQuantity: null,
        eUnit: null,
        exDesc: "",
        exAmount: null,
        exQuantity: null,
        exUnit: null
    }
    componentDidMount() {
        this.setState({
            incomeList: [
                { name: "Milk", amount: 20000, quantity: 20, unit: "litre" },
                { name: "Wool", amount: 10000, quantity: 20, unit: "kg" },
                { name: "Feed", amount: 30000, quantity: 20, unit: "kg" }
            ],
            expenseList: [
                { name: "Milk", amount: 20000, quantity: 20, unit: "litre" },
                { name: "Wool", amount: 10000, quantity: 20, unit: "kg" },
                { name: "Feed", amount: 30000, quantity: 20, unit: "kg" }
            ]
        });
        // axios.post("/api/finances/trial",{type:"getAll"})

    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    addEarning = () => {
        this.setState({
            incomeList: [...this.state.incomeList, { name: this.state.eDesc, amount: parseFloat(this.state.eAmount), quantity: parseFloat(this.state.eQuantity), unit: this.state.eUnit }],
            eDesc: "",
            eAmount: null,
            eQuantity: null,
            eUnit: ""
        });
    }
    addExpense = () => {
        this.setState({
            expenseList: [...this.state.expenseList, { name: this.state.exDesc, amount: parseFloat(this.state.exAmount), quantity: parseFloat(this.state.exQuantity), unit: this.state.unit }],
            exDesc: "",
            exAmount: null,
            exQuantity: null,
            exUnit: ""
        });
    }
    render() {
        let netExpenses = 0;
        let netEarnings = 0;
        this.state.expenseList.forEach(element => netExpenses = netExpenses + element.amount);
        this.state.incomeList.forEach(element => netEarnings = netEarnings + element.amount);
        const earnings = this.state.incomeList.map((e, i) =>
            <Record name={e.name} quantity={e.quantity} unit={e.unit} amount={e.amount} />
        );
        const expenses = this.state.expenseList.map((e, i) =>
            <Record name={e.name} quantity={e.quantity} unit={e.unit} amount={e.amount} />
        );
        return (
            <div>
                <p className="fin-head-text">Financial Summary</p>
                <div className="fin-earnings">
                    <div className="fin-top">
                        <p className="fin-text">Earnings</p>
                        <Link>
                            <FontAwesomeIcon className="fin-icon" icon={faFilter} size="2x" />
                        </Link>
                    </div>
                    <Table responsive>
                        <tbody style={{ textAlign: "center" }}>
                            {earnings}
                            <tr>
                                <td>
                                    <Input
                                        type="text"
                                        value={this.state.expenseDesc}
                                        onChange={this.onChange}
                                        className="fin-input"
                                        id="eDesc"
                                        placeholder="Description" />
                                </td>
                                <td>
                                    <Input
                                        type="text"
                                        value={this.state.expenseDesc}
                                        onChange={this.onChange}
                                        className="fin-input"
                                        id="eAmount"
                                        placeholder="Amount" />
                                </td>
                                <td>
                                    <Input
                                        type="text"
                                        value={this.state.expenseDesc}
                                        onChange={this.onChange}
                                        className="fin-input"
                                        id="eQuantity"
                                        placeholder="Quantity" />
                                </td>
                                <td>
                                    <Input
                                        type="text"
                                        value={this.state.expenseDesc}
                                        onChange={this.onChange}
                                        className="fin-input"
                                        id="eUnit"
                                        placeholder="Unit" />
                                </td>
                                <td>
                                    <Button onClick={this.addEarning} className="fin-button">Add</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="fin-expenses">
                    <div className="fin-top">
                        <p className="fin-text">Expenditure</p>
                        <Link>
                            <FontAwesomeIcon className="fin-icon" icon={faFilter} size="2x" />
                        </Link>
                    </div>
                    <Table responsive>
                        <tbody style={{ textAlign: "center" }}>
                            {expenses}
                            <tr>
                                <td>
                                    <Input
                                        type="text"
                                        value={this.state.expenseDesc}
                                        onChange={this.onChange}
                                        className="fin-input"
                                        id="exDesc"
                                        placeholder="Description" />
                                </td>
                                <td>
                                    <Input
                                        type="text"
                                        value={this.state.expenseDesc}
                                        onChange={this.onChange}
                                        className="fin-input"
                                        id="exAmount"
                                        placeholder="Amount" />
                                </td>
                                <td>
                                    <Input
                                        type="text"
                                        value={this.state.expenseDesc}
                                        onChange={this.onChange}
                                        className="fin-input"
                                        id="exQuantity"
                                        placeholder="Quantity" />
                                </td>
                                <td>
                                    <Input
                                        type="text"
                                        value={this.state.expenseDesc}
                                        onChange={this.onChange}
                                        className="fin-input"
                                        id="exUnit"
                                        placeholder="Unit" />
                                </td>
                                <td>
                                    <Button onClick={this.addExpense} className="fin-button">Add</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="fin-net-earnings">
                    <div className="main-container">
                        <p className="fin-net-text">Net Earnings:</p>
                        <p className="fin-net-quantity">{netEarnings}</p>
                    </div>
                </div>
                <div className="fin-net-expenses">
                    <div className="main-container">
                        <p className="fin-net-text">Net Expenditures:</p>
                        <p className="fin-net-quantity">{netExpenses}</p>
                    </div>
                </div>
                <div className="fin-net">
                    <p className="fin-net-text">Net Income:</p>
                    <p className="fin-net-quantity" style={{ float: 'right' }}>Rs. {netEarnings - netExpenses}</p>
                </div>
            </div >
        );
    }
}

export default Finance;