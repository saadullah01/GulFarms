import React, { Component, useState } from 'react';
import {
    Label,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';

import Option from './Option'
class AddTextField extends Component {
    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            Name: props.Name,
            modal: true,
            data: [],
            FieldName: "",
            FieldType: "String",
            Unit: "",
            Option: []

        }
    }
    submitt = () => {
        this.props.update(this.state.data)
    }

    add = e => {

        this.setState(state => {

            const data = state.data.concat({
                Name: this.state.FieldName, Type: this.state.FieldType,
                Unit: this.state.Unit, Option: this.state.Option, checked: this.state.checked
            });
            return {
                data,
            };
        }, () => this.submitt()
        );
        this.resett()

    };
    onChangeCheck = e => {
        this.setState(prevState => ({
            checked: !prevState.checked
        }))
    }
    onChangeCheckNot = e => {
        this.setState(prevState => ({
            checked: prevState.checked
        }))
    }
    resett = () => {
        this.setState({
            FieldName: "",
            FieldType: "String",
            Unit: "",
            Option: [],
            checked: false
        });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    select = e => {
        this.setState({ FieldType: e.target.id });
    }
    remove = d => {

        this.setState(state => {

            const data = state.data.filter((item, j) => d !== j)
            return {
                data,

            };
        }, () => this.submitt());
        this.resett()
    };
    unit() {
        if (this.state.FieldType === "Numeric") {
            return (
                <Col>
                    <Input
                        className="input-field-ad"
                        type="text"
                        placeholder="Unit"
                        onChange={this.onChange}
                        value={this.state.Unit}
                        id="Unit"
                    />
                </Col>
            )
        }
    }

    onAdd = e => {
        this.setState({ Option: e });
    }
    option() {
        if (this.state.FieldType === "Options") {
            return (

                <Option update={this.onAdd}></Option>
            )
        }

    }
    none() {
        if (this.state.FieldType !== "Options" && this.state.FieldType !== "Numeric") {
            return (

                <Col>
                    <div
                    />
                </Col>
            )
        }
    }
    ViewOption = (d) => {
        return (

            <Label>{d.Option.join(",")}</Label>

        )

    }
    displayValue = (d) => {
        if (d.Type === "Numeric") {
            return (
                <Col>
                    <Label className="text-label-b">{d.Unit}</Label>
                </Col>
            )
        }
        else if (d.Type === "Options") {
            return (
                <Col>
                    <Label className="text-label-b">{this.ViewOption(d)}</Label>
                </Col>
            )
        }
        else{
            return(
            <Col>
                    <Label className="text-label-b"></Label>
            </Col>
            )
        }
    }
    display() {
        return this.state.data.map((d, index) => {
            return (
                <Row>
                    <Col>
                        <Label className="text-label-b">{d.Name}</Label>
                    </Col>
                    <Col>
                        <Label className="text-label-b">{d.Type}</Label>
                    </Col>
                    <Col>
                        <Label>Track</Label>
                    </Col>
                    <Col>
                        <Input
                            className="input-field-check"
                            type="checkbox"
                            checked={d.checked}
                            onChange={this.onChangeCheckNot}
                        />
                    </Col>
                    {this.displayValue(d)}
                    <Button close onClick={() => this.remove(index)}>x</Button>
                </Row>
            );
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Row xs ="1">
                    <Label for="fname" className="text-label">Add {this.state.Name}: </Label>
                </Row>

                {this.display()}

                <Row xs ="4">
                    <Col>
                        <Input
                            className="input-field-ad"
                            type="text"
                            placeholder="Name"
                            onChange={this.onChange}
                            value={this.state.FieldName}
                            id="FieldName"
                        />
                    </Col>
                    <Col>
                        <UncontrolledDropdown className="edit-info">
                            <DropdownToggle color="correct" caret>{this.state.FieldType}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem id="String" onClick={this.select}>String</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem id="Numeric" onClick={this.select}>Numeric</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem id="Options" onClick={this.select}>Options</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                    {this.unit()}
                    {this.option()}
                    {/* {this.none()} */}
                    <FormGroup>
                        <Col>
                            <Row>
                                <Col>
                                    <Label>Track</Label>
                                </Col>
                                <Col>
                                    <Input
                                        className="input-field-check"
                                        type="checkbox"
                                        onChange={this.onChangeCheck}
                                        checked={this.state.checked}
                                        id="CheckBox"
                                    />
                                </Col>
                            </Row>
                        </Col>

                    </FormGroup>
                </Row>
                <Row><FormGroup></FormGroup></Row>

                <Row>

                    <FormGroup>
                        <Row>
                            <Col />
                            <Col><Button className="plus-btn-small" onClick={this.add} >+</Button></Col>

                        </Row>
                    </FormGroup>
                </Row>
            </div>

        )
    }
}

export default AddTextField;
