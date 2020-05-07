import React, { Component} from 'react';
import { Link, withRouter  } from 'react-router-dom';
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
import { connect } from "react-redux"
import {removeItem} from "../actions/removeActions"
class RemoveFarmTemplates extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "Error_Entry",
            reason: "",
            errors:{},
            modal:true,
            name: props.Name
        }
    }
    // Can Add Constructor
    componentDidMount() {
        if(this.props.farms.length <= this.ids("farm") ||
        this.props.presets.length <= this.ids("preset") ||
        this.props.barns.length <=this.ids("barn") ){
            this.props.history.push("/home/farms");
            return
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.props.history.push("/home/farms");
            return
        }
    }
    ids=(name)=>{
        const dic = {
            farm: this.props.match.params.fid,
            preset: this.props.match.params.pid,
            barn:this.props.match.params.bid,
            instance: this.props.match.params.iid
        }
        return parseInt(dic[name])
    }
    dbId=()=>{
        switch(this.state.name){
            case "Farm":
                return this.props.farms[this.ids("farm")]._id
        }
    }
    removed=()=>{
        switch(this.state.name){
            case "Farm":
                return this.props.farms[this.ids("farm")].removed
        }
    }
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
        const data = {
            removalComment: this.state.selectedOption,
            reason: this.state.Reason,
            id:this.dbId(),
            removed:1
        }
        this.props.removeItem(data,this.state.name)
        
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
                        Remove {this.state.Name}
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
                                <Row xs="1">
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
                </Form>
                </Container>
                </ModalBody>
                <ModalFooter>
                    <Button className="login-btn" type="submit" onClick={this.onSubmit}>Save</Button>
                </ModalFooter>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    loggedIn: state.authReducer.islogged,
    errors: state.errorReducer.errors,
    farms: state.farmReducer.farms,
    presets:state.presetReducer.presets,
    barns:state.barnReducer.barns
});
export default connect(
    mapStateToProps,
    { removeItem }
)(withRouter(RemoveFarmTemplates));
