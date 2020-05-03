import React, { Component} from 'react';
import {
    Label,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';

class AddAlert extends Component {
    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            Name:props.Name,
            title:props.title,
            modal: true,
            data: [],
            number: 1,
            a_description:"",
            a_duration:"",      
            selectedOption: "Year"
            
        }
    }
    
    submitt = () =>{
        this.props.update(this.state.data)    
    }
    add = e => {
        
        this.setState(state => {

            const data = state.data.concat({description: state.a_description, duration: state.a_duration, selectedOption: state.selectedOption});
            return {
            data,
            };
        }, ()=> this.submitt()
        );
        this.resett()
        
    };
    resett = () =>{
        this.setState({
            a_duration:"",
            a_description:"",
            selectedOption:"Year"
         });
    };
    select = e => {
        this.setState({ selectedOption: e.target.id });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    remove = d => {
        
        this.setState(state => {
            
            const data = state.data.filter((item, j) => d !==j )
            return {
              data,
              
            };
          }, () => this.submitt());
        this.resett()
    };
    
    display() {
        return this.state.data.map((d,index) => {
            return (
                
                <Row key ={index}>
                        <Col >
                        <Label className="text-label">{d.description}</Label>
                        </Col>
                        <Col >
                        <Label className="text-label">{d.duration}</Label>
                        </Col>
                        <FormGroup>
                            <Row>
                            <Col >
                            <Label className="text-label">{d.selectedOption}</Label>
                            </Col>
                            <Col> 
                            <Button close onClick={() =>   this.remove(index)}>x</Button>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            </Row>
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
                    {this.submitt}
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
                                placeholder={this.state.title}
                                onChange={this.onChange}
                                value={this.state.a_duration} 
                                id="a_duration"
                            />
                        </Col>
                        <FormGroup>
                            <Col >
                            <Row>
                                <UncontrolledDropdown className="edit-info" >
                                    <DropdownToggle color="correct" caret>
                                        {this.state.selectedOption}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem id= "Year" onClick= {this.select}>Year</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id= "Month" onClick= {this.select}>Month</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id= "Day" onClick= {this.select}>Day</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem id= "week" onClick= {this.select}>week</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Row>
                        </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <Col/>
                        <Col>
                            <Row>
                                    <Button className="plus-btn" onClick= {this.add} >+</Button>
                                    
                                </Row>
                        </Col>
                        <Col/>
                    </Row>
                </div>
        )
    }
}

export default AddAlert;
