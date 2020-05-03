import React, { Component } from 'react';
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
    Button
} from 'reactstrap';

import { logoutUser } from "../../actions/authActions";

import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavLinks (props) {
    const link = props.link.substring(props.link.lastIndexOf('/') + 1);
    if (link && link !== "home" && link !== "farms" && link !== "alerts" && link !== "finance") {
        return (
            <Nav className="mr-auto" navbar>
                <Link className="nav-link" to="/home/farms">Farms</Link>
                <span className="separator"></span>
                <Link className="nav-link" to="/home/alerts">Alerts</Link>
                <span className="separator"></span>
                <Link className="nav-link" to="/home/finance">Finance</Link>
            </Nav>
        );
    } else {
        return null;
    }
}

class AppNavbar extends Component{
    constructor (props) {
        super(props);
        this.state = {
            isOpen: false,
            link: props.link
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const check = (word)=>(window.location.href.indexOf(word) > -1)
        return  check("register") ||  check("login") || check("reset-password")||  check("forgot-password") ? null: (
            <div >
                <Navbar className="navbar" expand="md">
                    <div className="main-container">
                        <NavbarBrand className="brand" href="/home">GUL FARMS</NavbarBrand>
                        <NavbarToggler className="toggle" onClick={this.toggle}><FontAwesomeIcon icon={ faBars } /></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <NavLinks link={window.location.href} />
                            <Nav className="ml-auto">
                                <Form inline nav>
                                    <FormGroup>
                                        <Button className="nav-button"><FontAwesomeIcon icon={ faSearch } size="lg" /></Button>
                                        <Input type="text" name="search" id="exampleSearch" placeholder="Search Animal ID" />
                                    </FormGroup>
                                </Form>
                                <UncontrolledDropdown className="edit-info">
                                    <DropdownToggle className="nav-button">
                                        <FontAwesomeIcon icon={ faCog } size="lg" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Change Password</DropdownItem>
                                        <DropdownItem divider />
                                        <Link to="/add-user">
                                            <DropdownItem>Add User</DropdownItem>
                                        </Link>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.props.logoutUser}>Log Out</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}
export default connect(null,{ logoutUser })(AppNavbar);