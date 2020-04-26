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
    Input
} from 'reactstrap';

import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

function NavLinks (props) {
    const link = props.link.substring(props.link.lastIndexOf('/') + 1);
    if (link && link !== "home" && link !== "farms" && link !== "alerts" && link !== "finances") {
        return (
            <Nav className="mr-auto" navbar>
                <NavItem className="nav-link-container">
                    <NavLink className="nav-link" href="/farms">Farms</NavLink>
                </NavItem>
                <span className="separator"></span>
                <NavItem className="nav-link-container">
                    <NavLink className="nav-link" href="/alerts">Alerts</NavLink>
                </NavItem>
                <span className="separator"></span>
                <NavItem className="nav-link-container">
                    <NavLink className="nav-link" href="/finance">Finance</NavLink>
                </NavItem>
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
        return !this.props.auth ? null: (
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
                                        <Label className="search"><FontAwesomeIcon icon={ faSearch } /></Label>
                                        <Input type="text" name="search" id="exampleSearch" placeholder="Search Animal ID" />
                                    </FormGroup>
                                </Form>
                                <UncontrolledDropdown className="edit-info">
                                    <DropdownToggle nav>
                                        <FontAwesomeIcon icon={ faCog } size="lg" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Change Password</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Manage Users</DropdownItem>
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

const mapStateToProps = state => ({
    auth: state.authReducer.islogged,
});
export default connect(
    mapStateToProps,
    { }
)(AppNavbar);