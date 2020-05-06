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
    UncontrolledDropdown,
    Table
} from 'reactstrap';

import Option from './Option'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlusCircle, faPlusSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
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
                <div className="col-sm-3 pl-2">
                    <Input
                        type="text"
                        placeholder="Unit"
                        onChange={this.onChange}
                        value={this.state.Unit}
                        id="Unit"
                    />
                </div>
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
    displayValue = (d) => {
        if (d.Type === "Numeric") {
            return (
                <td>{d.Unit}</td>
            )
        }
        else if (d.Type === "Options") {
            return (
                <td>{d.Option.join(",")}</td>
            )
        }
        else {
            return (
                <td>...</td>
            )
        }
    }
    display() {
        const values = this.state.data.map((d, index) =>
            <tr>
                <td>{d.Name}</td>
                <td>{d.Type}</td>
                <td>
                    <Label>Track</Label>
                    <Input
                        style={{ margin: "7px" }}
                        type="checkbox"
                        checked={d.checked}
                        readOnly
                    />
                </td>
                {this.displayValue(d)}
                <td><FontAwesomeIcon color="#4caf50" icon={faTimes} onClick={() => this.remove(index)} /></td>
            </tr>
        );
        return (
            <Table responsive>
                <tbody>
                    {values}
                </tbody>
            </Table>
        );
        // return this.state.data.map((d, index) => {
        //     return (
        //         <Row>
        //             <Col>
        //                 <Label className="text-label-b">{d.Name}</Label>
        //             </Col>
        //             <Col>
        //                 <Label className="text-label-b">{d.Type}</Label>
        //             </Col>
        //             <Col>
        //                 <Label>Track</Label>
        //             </Col>
        //             <Col>
        //                 <Input
        //                     className="input-field-check"
        //                     type="checkbox"
        //                     checked={d.checked}
        //                     readOnly    
        //                 />
        //             </Col>
        //             {this.displayValue(d)}
        //             <Button close onClick={() => this.remove(index)}>x</Button>
        //         </Row>
        //     );
        // })
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                {this.display()}
                <Row>
                    <div className="col-sm-3">
                        <FormGroup>
                            <Label style={{fontSize: "22px"}}>Track</Label>
                            <Input
                                style={{margin: "13px 0px 10px 8px"}}
                                type="checkbox"
                                onChange={this.onChangeCheck}
                                checked={this.state.checked}
                                id="CheckBox"
                            />
                        </FormGroup>
                    </div>
                    <div className="col-sm-3 pl-0 pr-2">
                        <Input
                            type="text"
                            placeholder="Name"
                            onChange={this.onChange}
                            value={this.state.FieldName}
                            id="FieldName"
                        />
                    </div>
                    <div className="col-sm-3 pl-0 pr-0">
                        <UncontrolledDropdown
                            style={{
                                backgroundColor: "#4caf50",
                                textAlign: "center",
                                borderRadius: "20px"
                            }}>
                            <DropdownToggle
                                color="correct"
                                caret
                                style={{ color: "white" }}>{this.state.FieldType}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem id="String" onClick={this.select}>String</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem id="Numeric" onClick={this.select}>Numeric</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem id="Options" onClick={this.select}>Options</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    {this.unit()}
                    {this.option()}
                    <div className="col-sm-12">
                        <Button
                            onClick={this.add}
                            style={{
                                backgroundColor: "#4caf50",
                                border: "solid 1px #4caf50",
                                borderRadius: "10px"
                            }}
                        ><FontAwesomeIcon color="white" icon={faPlus} /></Button>
                    </div>
                </Row>
                {/* <Row><FormGroup></FormGroup></Row>

                <Row>

                    <FormGroup>
                        <Row>
                            <Col />
                            <Col><Button className="plus-btn-small" onClick={this.add} >+</Button></Col>

                        </Row>
                    </FormGroup>
                </Row> */}
            </div>

        )
    }
}

export default AddTextField;
