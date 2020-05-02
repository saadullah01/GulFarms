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

class RemoveAnimalTemplate extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "Error_Entry",
            reason: "",
            errors:{},
            modal:true,
            name:props.Name
        }
    }
    // Can Add Constructor

    
    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption : changeEvent.target.value
        });
    };

    toggle= () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    onChange = e => {
        if(this.state.selectedOption === "Other") {
            this.setState({ [e.target.id]: e.target.value });
        }
        
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            Option: this.state.selectedOption,
            Reason: this.state.Reason
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
                        Remove {this.state.name}
                    </h3>
                    </Col>
                    
                    
                    </Row>
                    
                </ModalHeader></center>
                <ModalBody>
                <Container>
                <Form className="add-farm" noValidate onSubmit={this.onSubmit}>
                    
                    <FormGroup>
                        <Row>
                            <Col>
                                <Row>
                                    <Label className="text-label"> Reason For Removal</Label>
                                </Row>
                                <Row>
                                    <Col>
                                    <Label className="text-label-black">
                                        <input
                                        type="radio"
                                        name="remove_farm"
                                        value="Error_Entry"
                                        checked={this.state.selectedOption === "Error_Entry"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />Error Entry
                                    </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Label className="text-label-black">
                                        <input
                                        type="radio"
                                        name="remove_farm"
                                        value="Sold"
                                        checked={this.state.selectedOption === "Sold"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />Sold
                                    </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Label className="text-label-black">
                                        <input
                                        type="radio"
                                        name="remove_farm"
                                        value="Died"
                                        checked={this.state.selectedOption === "Died"}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />Died
                                    </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="text-label-black">
                                            <input
                                            type="radio"
                                            name="remove_farm"
                                            value="Other"
                                            checked={this.state.selectedOption === "Other"}
                                            onChange={this.handleOptionChange}
                                            className="form-check-input"
                                        />Other
                                        </Label>
                                    </Col>
                                    <Col>
                                    <Input 
                                    className="input-field-ot"
                                    type="text" 
                                    id = "reason"
                                    placeholder="Enter an explanation" 
                                    onChange={this.onChange} 
                                    value={this.state.reason} 
                                    error={errors.reason} 
                                    />
                                    </Col>
                                
                                </Row>
                                <Row>
                                    <Button onClick= {this.Undo} className="undo-btn">Undo</Button>
                                </Row>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Row>
                        
                    <Button className="login-btn" onClick= {this.toggle}>Save</Button>
                    </Row>
                </Form>
                </Container>
                </ModalBody>
                </Modal>
        )
    }
}
export default RemoveAnimalTemplate;
