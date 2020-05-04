import React, { Component } from 'react';
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

class AddProduct extends Component {
    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            Name: props.Name,
            title: props.title,
            modal: true,
            data: [],
            number: 1,
            AlertDescription: "",
            AlertDuration: "",
            selectedOption: "Year",
            checked: false

        }
    }

    submitt = () => {
        this.props.update(this.state.data)
    }
    add = e => {

        this.setState(state => {

            const data = state.data.concat({ description: state.AlertDescription, 
                duration: state.AlertDuration, selectedOption: state.selectedOption, checked: state.checked });
            return {
                data,
            };
        }, () => this.submitt()
        );
        this.resett()

    };
    resett = () => {
        this.setState({
            AlertDuration: "",
            AlertDescription: "",
            selectedOption: "Year",
            checked:false
        });
    };
    onChangeCheck = e =>{
        this.setState(prevState=>({
            checked : !prevState.checked
        }))
    }
    select = e => {
        this.setState({ selectedOption: e.target.id });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
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

    display() {
        return this.state.data.map((d, index) => {
            return (

                <Row key={index}>
                    <Col >
                        <Label className="text-label">{d.description}</Label>
                    </Col>
                    <Col >
                        <Label className="text-label">{d.duration}</Label>
                    </Col>
                    <FormGroup>
                        <Row>
                            <Col >
                                <Label className="text-label">{d.selectedOption}</Label>
                            </Col>
                            <Col>
                                <Button close onClick={() => this.remove(index)}>x</Button>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </FormGroup>

                </Row>

            );
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Row>
                    <Label for="fname" className="text-label">Add {this.state.Name}: </Label>
                </Row>

                {this.display()}
                {this.submitt}
                <Row>

                    <Col>
                        <Input
                            className="input-field-ad"
                            type="text"
                            placeholder="Name"
                            onChange={this.onChange}
                            value={this.state.AlertDescription}
                            id="AlertDescription"
                        />
                    </Col>
                    <Col>
                        <Input
                            className="input-field-ad"
                            type="text"
                            placeholder={this.state.title}
                            onChange={this.onChange}
                            value={this.state.AlertDuration}
                            id="AlertDuration"
                        />
                    </Col>
                    <FormGroup>
                        <Col >
                            <Row>
                                <UncontrolledDropdown className="edit-info" >
                                    <DropdownToggle color="correct" caret>
                                        {this.state.selectedOption}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem id="Year" onClick={this.select}>Year</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id="Month" onClick={this.select}>Month</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id="Day" onClick={this.select}>Day</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id="week" onClick={this.select}>week</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Row>
                        </Col>
                    </FormGroup>
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
                            checked = {this.state.checked}
                            id="AlertDuration"
                        />
                        </Col>
                        </Row>
                        </Col>
                        
                    </FormGroup>
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <Row>
                            <Button className="plus-btn" onClick={this.add} >+</Button>

                        </Row>
                    </Col>
                    <Col />
                </Row>
            </div>
        )
    }
}

export default AddProduct;
