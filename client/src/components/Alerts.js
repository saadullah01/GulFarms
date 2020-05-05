import React, { Component } from "react";
import {
    Table
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell
} from '@fortawesome/free-solid-svg-icons';
import Tab from "./sub_components/Tab";

function OneAlert(props) {
    const color = (props.index % 2) ? "#e6ffee" : "#80ffaa";
    return (
        <tr style={{"background-color": color}}>
            <td>{ props.name }</td>
            <td>{ props.id }</td>
            <td>{ props.alertDesc }</td>
            <td>{ props.due }</td>
            <td>{ props.unit }</td>
        </tr>
    );
}

class Alerts extends Component {
    state = {
        alerts: []
    }
    componentDidMount() {
        this.setState({
            alerts: [
                {
                    id: 1,
                    name: "Sheep",
                    alertDesc: "Expecting Delivery",
                    due: 1,
                    unit: "month"
                },
                {
                    id: 1,
                    name: "Sheep",
                    alertDesc: "Expecting Delivery",
                    due: 1,
                    unit: "month"
                },
                {
                    id: 1,
                    name: "Sheep",
                    alertDesc: "Expecting Delivery",
                    due: 1,
                    unit: "month"
                },
                {
                    id: 1,
                    name: "Sheep",
                    alertDesc: "Expecting Delivery",
                    due: 1,
                    unit: "month"
                },
                {
                    id: 1,
                    name: "Sheep",
                    alertDesc: "Expecting Delivery",
                    due: 1,
                    unit: "month"
                },
                {
                    id: 1,
                    name: "Sheep",
                    alertDesc: "Expecting Delivery",
                    due: 1,
                    unit: "month"
                },
                {
                    id: 1,
                    name: "Sheep",
                    alertDesc: "Expecting Delivery",
                    due: 1,
                    unit: "month"
                }
            ]
        });
    }
    render() {
        const alerts = this.state.alerts.map((a, i) => 
            <OneAlert index={i} name={a.name} id={a.id} alertDesc={a.alertDesc} due={a.due} unit={a.unit} />
        );
        return (
            <div style={{ width: "100%" }}>
                <p className="alert-head"><FontAwesomeIcon className="alert-icon" icon={faBell} />Alerts</p>
                <Table className="alert-table" responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Alert Description</th>
                            <th>Due</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        { alerts }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Alerts;
