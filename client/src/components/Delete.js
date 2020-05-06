import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
    Table,
} from "reactstrap";
import ViewAlert from "./ViewAlert";
import { connect } from "react-redux";

class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delArr: []
        }
    }
    componentDidMount() {
        this.setState({
            delArr: [
                {
                    name: "item",
                    desc: "It is deleted for no reason"
                },
                {
                    name: "item",
                    desc: "It is deleted for no reason"
                },
                {
                    name: "item",
                    desc: "It is deleted for no reason"
                }
            ]
        });
    }
    remove = index => {
        console.log(index) // Arham Implement Accordingly
    }
    render() {
        const delElements = this.state.delArr.map((e, i) =>
            <tr>
                <td>{e.name}</td>
                <td>{e.desc}</td>
                <td>
                    <Button 
                    onClick={() => this.remove(i)}
                    style={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        borderRadius: "15px"
                    }}>
                        Restore
                    </Button>
                </td>
            </tr>
        );
        return (
            <div style={{ width: "90%", margin: "0 auto" }}>
                <Table>
                    <thead>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </thead>
                    <tbody>
                        { delElements }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Delete;