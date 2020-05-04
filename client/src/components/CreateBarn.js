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

class CreateFarm extends Component{
    
    // Can Add Constructor
    state = {
        modal:true,
        AnimalName:"",
        p1:"",
        p2: "",
        errors : {},
        attributes:[],
        alerts:[]
    }
    
    

    toggle= () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    
    onAdd = e =>{
        this.setState({ alerts: e });
    }
    
    onAdd_Att = e =>{
        this.setState({ attributes: e });
    }
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            AnimalName: this.state.AnimalName,
            p1:this.state.p1,
            p2: this.state.p2,
            errors : this.state.errors,
            attributes:this.state.attributes,
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
                        Create New Barn
                    </h3>
                    </Col>
                    
                    
                    </Row>
                    
                </ModalHeader></center>
                <ModalBody>
                <Container>
                <Form className="add-farm" noValidate onSubmit={this.onSubmit}>
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
                            
                            
                            
                        <Col>
                        <Row>
                            <Label className= "h4">
                                Attributes:
                            </Label>
                        </Row>
                        <Row>
                            <Col><AddTextField Name="Attributes" update= {this.onAdd_Att}></AddTextField></Col>
                            
                        </Row>
                        </Col>
                            
                        <Col>
                        <Row>
                            <Label className= "h4">
                                Products:
                            </Label>
                        </Row>
                        <Row>
                            <Col>
                            <AddAlert Name="Alerts" title = "Duration" update= {this.onAdd}></AddAlert>
                            </Col>
                            <Col/>
                        </Row>
                        </Col>
                        
                        </Col>
                        <Row>
                            
                    <Button className="login-btn" onClick= {this.toggle}>Save</Button>
                        </Row>
                </Row>
                </Form>
                </Container>
                </ModalBody>
                </Modal>
        )
    }
}
export default CreateFarm;
