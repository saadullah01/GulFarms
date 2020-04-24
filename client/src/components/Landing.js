import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Col,
    Row
} from 'reactstrap';
import Tab from './Tab';

class Landing extends Component{
    // Can Add Constructor
    state = {
        
    }

    toggle = () => {
        
    }

    render() {
        return (
            <Container>
                <Row>
                    <Tab name="Farms" link="/farms" />
                    <Tab name="Alerts" link="/alerts" />
                    <Tab name="Finance" link="/finance" />
                </Row>
            </Container>
        );
    }
}

export default Landing;
