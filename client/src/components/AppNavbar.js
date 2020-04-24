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
    Container
} from 'reactstrap';

class AppNavbar extends Component{
    // Can Add Constructor
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar className="navbar" expand="md">
                    <Container>
                        <NavbarBrand className="brand" href="/">GUL FARMS</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink className="nav-link" href="/farms">Farms</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" href="/">Alerts</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" href="/">Finance</NavLink>
                                </NavItem>
                            </Nav>
                            <Form inline nav>
                                <FormGroup>
                                    <Label for="search"></Label>
                                    <Input type="text" name="search" id="exampleSearch" placeholder="Search Animal ID" />
                                </FormGroup>
                            </Form>
                            <UncontrolledDropdown className="edit-info">
                                <DropdownToggle nav>
                                    Edit Info
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Change Password</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Manage Users</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar;
