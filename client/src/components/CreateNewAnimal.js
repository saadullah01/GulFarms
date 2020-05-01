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
    Col,
    UncontrolledCollapse,
    Card,
    CardBody
} from 'reactstrap';
import AddAlert from './AddAlerts';
import AddTextField from './AddTextField'

class CreateAnimal extends Component{
    
    // Can Add Constructor
    state = {
        modal:true,
        animalName:"",
        p1:"",
        p2: "",
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
            animalName: this.state.animalName,
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
                        Create New Animal
                    </h3>
                    </Col>
                    
                    
                    </Row>
                    
                </ModalHeader></center>
                <ModalBody>
                <Container>
                <Form className="add-animal" noValidate onSubmit={this.onSubmit}>
                    <Row>
                        <Col>
                        <FormGroup><Row>
                            
                            <Row>
                                <Input 
                                            className="input-field-heading"
                                            type="text"  
                                            placeholder="Enter Animal Name" 
                                            onChange={this.onChange} 
                                            value={this.state.AnimalName} 
                                            error={errors.AnimalName} 
                                            id="AnimalName"
                                        /> 
                                </Row>
                            
                            </Row></FormGroup>
                            <FormGroup><Row>
                            
                            <Row>
                                <Label className="h4">Attributes:</Label>
                            </Row>
                            
                            </Row></FormGroup>
                            <FormGroup><Row>
                            
                            <Row>
                                <Col><AddTextField Name="Attributes"></AddTextField></Col>
                                
                            </Row>
                            
                            </Row></FormGroup>
                            <FormGroup><Row>
                            
                            <Row>
                                <Label className="h4">Products:</Label>
                            </Row>
                            
                            </Row></FormGroup>
                            
                            <FormGroup><Row>
                            
                            <Row>
                                <Col><AddAlert Name="Products"></AddAlert></Col>
                                
                            </Row>
                            
                            </Row></FormGroup>
                            <Row>
                                
                        </Row>
                        </Col>
                        <Col>
                        <Row>
                            <Label className= "h4">
                                Parents
                            </Label>
                        </Row>
                        <Row>
                            <Col>
                            <Label className= "text-label">
                                Record Parents:
                            </Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div>
                            <Button className="plus-btn-small" id="toggler" style={{ marginBottom: '2rem' }}>
                            +
                            </Button>
                            <UncontrolledCollapse toggler="#toggler">
                            <Card>
                                <CardBody>
                                <Row>
                                    <Input 
                                        className="input-field-add"
                                        type="text"  
                                        placeholder="Enter Parent 1" 
                                        onChange={this.onChange} 
                                        value={this.state.p1} 
                                        error={errors.p1} 
                                        id="p1"
                                    /> 
                                </Row>
                                <Row>
                                    <Input 
                                        className="input-field-add"
                                        type="text"  
                                        placeholder="Enter Parent 2" 
                                        onChange={this.onChange} 
                                        value={this.state.p2} 
                                        error={errors.p2} 
                                        id="p2"
                                    /> 
                                </Row>
                                
                                </CardBody>
                            </Card>
                            </UncontrolledCollapse>
                        </div>
                            </Col>
                        </Row>
                        </Col>
                </Row>
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
export default CreateAnimal;
