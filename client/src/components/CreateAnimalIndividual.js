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

class CreateAnimalIndividual extends Component {

    // Can Add Constructor
    state = {
        modal: true,
        AnimalName: "",
        p1: "",
        p2: "",
        errors: {},
        attributes: [],//From DB
        attributes_update:[],
        alerts: [],//fromm DB
        alerts_update:[], 
        quant: "",
        date:""
    }



    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    onChange = (e, d,index) => {
        this.remove(index)
        
        this.setState(state => {

            const data = state.data.concat({Name: d.FieldName, Type: d.FieldType, Unit: d.Unit, Option: d.Option, quant: this.state.quant});
            return {
            data,
            };
        }
        );
        this.setState({ [e.target.id]: e.target.value });
    }
    onChange_Product = (e, d,index) => {
        this.remove(index)
        
        this.setState(state => {

            const data = state.data.concat({description: state.a_description, duration: state.a_duration, selectedOption: state.selectedOption, date: this.state.date});
            return {
            data,
            };
        }
        );
        this.setState({ [e.target.id]: e.target.value , date:''
        });
    }

    onAdd = e => {
        this.setState({ alerts: e });
    }

    onAdd_Att = e => {
        this.setState({ attributes: e });
    }
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            AnimalName: this.state.AnimalName,
            p1: this.state.p1,
            p2: this.state.p2,
            errors: this.state.errors,
            attributes: this.state.attributes,
            alerts: this.state.alerts
        }
        console.log(newUser);
    }
    remove = d => {
        
        this.setState(state => {
            
            const data = state.data.filter((item, j) => d !==j )
            return {
              data,
              
            };
          }, () => this.submitt());
    }
    Attributes() {
        return this.state.attributes.map((d, index) => {
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
                        <Input
                            className="input-field-heading"
                            type="text"
                            placeholder="Value"
                            onChange={this.onChange(d,index)}
                            value={this.state.quant}
                            id="quant"
                        />
                    </Col>
                </Row>
            );
        })
    }
    Products() {
        return this.state.alerts.map((d, index) => {
            return (
                <Row>

                    <Col>
                        <Label className="text-label-b">{d.description}</Label>
                    </Col>
                    <Col>
                        <Input
                            className="input-field-heading"
                            type="data"
                            placeholder="Date"
                            onChange={this.onChange(d,index)}
                            value={this.state.date}
                            id="date"
                        />
                    </Col>
                </Row>
            );
        })
    }
    render() {
        var modal = false
        const { errors } = this.state;
        return (
            <Modal size="lg" isOpen={this.state.modal} className="modal-dialog" align="centre" toggle={this.toggle} >
                <center>
                    <ModalHeader toggle={this.toggle} >
                    <Row>
                        <Col>
                        <Row>

                            <Col />
                            <Col xs="13">
                                <h3 className="h3" >
                                    Create New {this.state.AnimalName}
                                </h3>
                            </Col>

                        
                        </Row>
                        </Col>
                        </Row>
                    </ModalHeader></center>
                <ModalBody>
                    <Container>
                        <Form className="add-farm" noValidate onSubmit={this.onSubmit}>
                            <Row>
                                <Col>

                                <Row>
                                    <Label className="h4">
                                        Attributes:
                            </Label>
                                </Row>
                                <Row>
                                <Col>
                                <Label className="text-label-b">Name</Label>
                                </Col>
                                <Col>
                                <Label className="text-label-b">Type</Label>
                                </Col>
                                <Col>
                                <Label className="text-label-b">Units</Label>
                                </Col>
                                <Col>
                                <Label className="text-label-b">Value</Label>
                                </Col>
                                </Row>
                                <Row>
                                    <Col>{this.Attributes}</Col>

                                </Row>

                                <Row>
                                    <Label className="h4">
                                        Products:
                            </Label>
                                </Row>
                                <Row>
                                    <Col>
                                        {this.Products}
                                    </Col>
                                    <Col />
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Label className="h4">
                                        Parents
                            </Label>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="text-label">
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
                        <Row>

                            
                        </Row>
                        
                    
                </Row><Row>
                        <Button className="login-btn" onClick={this.toggle}>Save</Button>
                        </Row>
                </Form>
                </Container>
                </ModalBody >
                </Modal >
        )
    }
}
export default CreateAnimalIndividual;
