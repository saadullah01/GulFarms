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
    Input
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
            selectedOption: "y"
            
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
            selectedOption:"y"
         });
    };
    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    
    display() {
        return this.state.data.map(d => {
            return (
                <Row>
                        <Col >
                        <Label className="text-label">{d.description}</Label>
                        </Col>
                        <Col >
                        <Label className="text-label">{d.duration}</Label>
                        </Col>
                        <FormGroup>
                            <Col >
                            <Row>
                                 <Col xs="auto" ><Label className="small">
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="y"
                                        checked={this.state.selectedOption === "y"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    Y</Label>
                                </Col>
                                <Col xs= "auto">
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="m"
                                        checked={this.state.selectedOption === "m"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    /><Label className="small">M</Label>
                                </Col> 
                                 <Col xs="auto">
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="d"
                                        checked={this.state.selectedOption === "d"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    /><Label className="small">D</Label>
                                </Col>
                                 <Col >
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="h"
                                        checked={this.state.selectedOption === "h"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    /><Label className="small">H</Label></Col>
                            </Row>
                        </Col>
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
                                 <Col xs="auto" ><Label className="small">
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="y"
                                        checked={this.state.selectedOption === "y"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    Y</Label>
                                </Col>
                                <Col xs= "auto">
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="m"
                                        checked={this.state.selectedOption === "m"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    /><Label className="small">M</Label>
                                </Col> 
                                 <Col xs="auto">
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="d"
                                        checked={this.state.selectedOption === "d"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    /><Label className="small">D</Label>
                                </Col>
                                 <Col >
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="h"
                                        checked={this.state.selectedOption === "h"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    /><Label className="small">H</Label></Col>
                                
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
