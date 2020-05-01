import React, { Component, useState } from 'react';
import {
    Label,
    Row,
    Col,
    Button,
    Modal,
    Form,
    FormGroup,
    ModalBody,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';

class AddAlert extends Component {
    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            Name:props.Name,
            modal: true,
            data: [],
            number: 1,
            a_description:"",
            a_duration:"",      
            selectedOption: "Year"
            
        }
    }
    

    add = e => {
        this.setState(state => {

            const data = state.data.concat({description: state.a_description, duration: state.a_duration, selectedOption: state.selectedOption});
            return {
              data,
            };
          });
        this.resett()  
    };
    resett = () =>{
        this.setState({
            a_duration:"",
            a_description:"",
            selectedOption:"Year"
         });
    };
    select = e => {
        this.setState({ selectedOption: e.target.id });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    remove = d => {
        
        this.setState(state => {

            const data = state.data.filter((item, j) => d !==j )
            return {
              data,
            };
          });
    }
    
    display() {
        return this.state.data.map((d,index) => {
            return (
                <Row>
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
                            <Button close onClick={() =>   this.remove(index)}>x</Button>
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
                    
                    <Row>
                        
                        <Col>
                        <Input 
                                className="input-field-ad"
                                type="text" 
                                placeholder="Name"
                                onChange={this.onChange}
                                value={this.state.a_description}
                                id="a_description"
                            />
                        </Col>
                        <Col>
                        <Input 
                                className="input-field-ad"
                                type="text" 
                                placeholder="Duration"
                                onChange={this.onChange}
                                value={this.state.a_duration} 
                                id="a_duration"
                            />
                        </Col>
                        <FormGroup>
                            <Col >
                            <Row>
                                <UncontrolledDropdown className="edit-info" color= "chartreuse">
                                    <DropdownToggle color="success" caret>
                                        {this.state.selectedOption}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem id= "Year" onClick= {this.select}>Year</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id= "Month" onClick= {this.select}>Month</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id= "Day" onClick= {this.select}>Day</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id= "Hour" onClick= {this.select}>Hour</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Row>
                            <Row>
                                <Button className="plus-btn" onClick= {this.add} >+</Button>
                            </Row>
                        </Col>
                        </FormGroup>
                    </Row>
                </div>
        
        )
    }
}

export default AddAlert;
