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

class AddTextField extends Component {
    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            Name:props.Name,
            modal: true,
            data: [],
            FieldName:"",
            FieldType:"Field Type",
            Unit:"",
            Option:""
            
        }
    }
    

    add = e => {
        this.setState(state => {

            const data = state.data.concat({Name: state.FieldName, Type: state.FieldType, Unit:state.Unit, Option:state.Option});
            return {
              data,
            };
          });
        this.resett()  
    };
    resett = () =>{
        this.setState({
            FieldName:"",
            FieldType:"Field Type",
            Unit:"",
            Option:""
         });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    select = e => {
        this.setState({ FieldType: e.target.id });
    }
    display() {
        return this.state.data.map(d => {
            return (
                <Row>
                        
                        <Col>
                        <Label className="text-label-b">{d.Name}</Label>
                        </Col>
                        <Col>
                        <Label className="text-label-b">{d.Type}</Label>
                        </Col>
                        <Col>
                        <Label className="text-label-b">{d.Unit}</Label>
                        </Col>
                        <Col>
                        <Label className="text-label-b">{d.Option}</Label>
                        </Col>
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
                                value={this.state.FieldName}
                                id="FieldName"
                            />
                        </Col>
                        <Col>
                            <UncontrolledDropdown className="edit-info">
                                <DropdownToggle caret>
                                    {this.state.FieldType}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem id= "String" onClick= {this.select}>String</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem id= "Int" onClick= {this.select}>Int</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem id= "Bool" onClick= {this.select}>Bool</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
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
                        <Col>
                        <Input 
                                className="input-field-ad"
                                type="text" 
                                placeholder="Option"
                                onChange={this.onChange}
                                value={this.state.Option}
                                id="Option"
                            />
                        </Col>
                        </Row>
                        <Row>
                        <FormGroup>
                            <Row>
                                <Col/>
                                <Col><Button className="plus-btn-small" onClick= {this.add} >+</Button></Col>
                                
                            </Row>
                        </FormGroup>
                    </Row>
                </div>
        
        )
    }
}

export default AddTextField;