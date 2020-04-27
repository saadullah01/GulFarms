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
import AddAlert from './AddAlerts';

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
        if (this.state.modal) {
            window.location = "/home/farms";
        }
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
                    </ModalHeader>
                </center>
                <ModalBody>
                    <Container>
                        <Form className="add-farm" noValidate onSubmit={this.onSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Row>
                                            <Row>
                                                <Col>   
                                                    <Label for="fname" className= "text-label">Name: </Label>
                                                </Col>
                                                <Col md="6" xs="12">
                                                    <Input 
                                                    className="input-field-a"
                                                    type="text" 
                                                    id = "farmName"
                                                    placeholder="Enter name of farm" 
                                                    onChange={this.onChange} 
                                                    value={this.state.farmName} 
                                                    error={errors.farmName} 
                                                    />
                                                </Col>
                                            </Row>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Row>
                                                <Col md="5" xs="12">   
                                                    <Label for="flocation" className= "text-label">Location: </Label>
                                                </Col>
                                                <Col md="6" xs="12">
                                                    <Input 
                                                        className="input-field-a"
                                                        type="text" 
                                                        id="farmlocation"
                                                        placeholder="Enter location" 
                                                        onChange={this.onChange} 
                                                        value={this.state.Location} 
                                                        error={errors.Location} 
                                                        id="farmlocation"
                                                    />
                                                </Col>
                                            </Row>
                                        </Row>
                                    </FormGroup>
                                    <Row></Row>
                                    <FormGroup>
                                        <Row>
                                            <Row>
                                                <Col md="5" xs="12">   
                                                <Label for="Description" className= "text-label">Description: </Label>
                                                </Col>
                                                <Col md="6" xs="12">
                                                <Input 
                                                    className="input-field-a"
                                                    type="text"  
                                                    placeholder="Enter description" 
                                                    onChange={this.onChange} 
                                                    value={this.state.Description} 
                                                    error={errors.Description} 
                                                    id="Description"
                                                /> 
                                                </Col>
                                            </Row>
                                        </Row>
                                    </FormGroup>
                                    <Row></Row>
                                </Col>
                                <Col>
                                    <AddAlert Name="Alerts"></AddAlert>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button className="login-btn" onClick= {this.toggle}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default CreateFarm;