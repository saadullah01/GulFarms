import React, { Component, useState } from 'react';
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
    Col
} from 'reactstrap';

class CreateFarm extends Component{
    
    // Can Add Constructor
    state = {
        modal:true,
        farmName: "",
        Location: "",
        Description: "",
        alerts: [],
        errors : {}
    }
    
    

    toggle= () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            farmName: this.state.farmName,
            Location: this.state.Location,
            Description: this.state.Description,
            alerts: this.state.alerts
        }
        console.log(newUser);
    }

    render() {
        var modal = false
        const { errors } = this.state;
        return (
                <Modal size ="lg" isOpen= {this.state.modal}  className = "modal-dialog" align="centre" toggle= {this.toggle} >
                <center>
                <ModalHeader toggle = {this.toggle} >
                   
                    <Row>
                    
                    <Col/>
                    <Col xs="13">
                    <h3 className="h3" >
                        Create New Farm
                    </h3>
                    </Col>
                    
                    
                    </Row>
                    
                </ModalHeader></center>
                <ModalBody>
                <Container>
                <Form className="add-farm" noValidate onSubmit={this.onSubmit}>
                    
                    <FormGroup>
                        <Row>
                            <Col width= "auto" lg="5">
                                <Row>
                                    <Col text-align="centre">   
                                    <Label for="fname" className= "text-label">Name: </Label>
                                    </Col>
                                    <Col>
                                    <Input 
                                    className="input-field-add"
                                    type="text" 
                                    placeholder="Enter name of farm" 
                                    onChange={this.onChange} 
                                    value={this.state.farmName} 
                                    error={errors.farmName} 
                                    />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Label for="Add_alert" className= "text-label">Add Alerts: </Label>
                            </Col>
                        </Row>
                        
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col width= "auto" lg="5">
                                <Row>
                                    <Col>   
                                    <Label for="flocation" className= "text-label">Location: </Label>
                                    </Col>
                                    <Col>
                                    <Input 
                                        className="input-field-add"
                                        type="text" 
                                        placeholder="Enter location of farm" 
                                        onChange={this.onChange} 
                                        value={this.state.Location} 
                                        error={errors.Location} 
                                        id="farmlocation"
                                    />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                    <Input 
                                        className="input-field-add"
                                        type="text" 
                                        placeholder="Enter alert description" 
                                        onChange={this.onChange} 
                                        value= {this.alert_1} 
                                        error={errors.a1} 
                                        id="alertdescription"
                                    />
                                    </Col>
                                    <Col>
                                    <Input 
                                        className="input-field-add"
                                        type="text" 
                                        placeholder="Enter alert duration" 
                                        onChange={this.onChange} 
                                        value={this.alert_2} 
                                        error={errors.a2} 
                                        id="alertduration"
                                    />
                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>
                                
                            </Col>
                        </Row>
                        </FormGroup>
                        <FormGroup>
                        <Row>
                            <Col width= "auto" lg="5">
                                <Row>
                                    <Col text-align="centre">   
                                    <Label for="Description" className= "text-label">Description: </Label>
                                    </Col>
                                    <Col>
                                    <Input 
                                            className="input-field-add"
                                            type="text" 
                                            placeholder="Enter description" 
                                            onChange={this.onChange} 
                                            value={this.state.Description} 
                                            error={errors.Description} 
                                            id="farmdescription"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                            <Button className="plus-btn" id="new_alert_row">+</Button>
                            </Col>
                        </Row>
                        
                    </FormGroup>
                <FormGroup>
                    <Row>

                    </Row>
                </FormGroup>
                </Form>
                </Container>
                </ModalBody>
                <ModalFooter>
                    <Button className="login-btn" onClick= {this.toggle}>Save</Button>
                </ModalFooter>
                </Modal>
        )
    }
}
export default CreateFarm;