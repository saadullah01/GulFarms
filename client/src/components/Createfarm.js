import React, { Component} from 'react';
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

class CreateFarm extends Component {

    // Can Add Constructor
    state = {
        modal: true,
        farmName: "",
        Location: "",
        Description: "",
        alerts: [{description:"L"}],
        errors: {}
    }



    toggle = () => {
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
            <Modal size="lg" isOpen={this.state.modal} className="modal-dialog" align="centre" toggle={this.toggle} >
                <center>
                    <ModalHeader toggle={this.toggle} >

                        <Row>

                            <Col />
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
                            <Row>
                                <FormGroup><Row>
                                    <Col>
                                        <Label for="fname" className="text-label">Name: </Label>
                                    </Col>
                                    <Col>
                                        <Input
                                            className="input-field-a"
                                            type="text"
                                            id="farmName"
                                            placeholder="Enter name of farm"
                                            onChange={this.onChange}
                                            value={this.state.farmName}
                                            error={errors.farmName}
                                        />
                                    </Col></Row>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup><Row>
                                    <Col>
                                        <Label for="flocation" className="text-label">Location: </Label>
                                    </Col>
                                    <Col >
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
                                    </Col></Row>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup><Row>
                                    <Col>
                                        <Label for="Description" className="text-label">Description: </Label>
                                    </Col>
                                    <Col >
                                        <Input
                                            className="input-field-a"
                                            type="text"
                                            placeholder="Enter description"
                                            onChange={this.onChange}
                                            value={this.state.Description}
                                            error={errors.Description}
                                            id="Description"
                                        />
                                    </Col></Row>
                                </FormGroup>
                            </Row>
                                    <Row>
                                    <Col><AddAlert update= {this.onAdd} Name="Alerts" title = "Duration"></AddAlert></Col>
                                    <Col></Col>
                                    </Row>
                </Form>
                </Container>
                </ModalBody>
                        <ModalFooter>
                            <Button className="login-btn" onClick={this.toggle}>Save</Button>
                        </ModalFooter>
                </Modal>
        )
    }
}
export default CreateFarm;
