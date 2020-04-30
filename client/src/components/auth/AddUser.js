import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import logo from '../../images/logo.png';


class AddUser extends Component {
    state = {
        email: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email
        }
        console.log(userData);
        axios
            .post("/api/users/add-user",userData)
            .then(res => 
                window.location.href="/home"
            )
            .catch(err => {

                console.log(err.response)
                this.setState({
                    email: "",
                    errors: err.response.data
                })
            })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                    {/* <p className="text-heading mb-4">GUL FARMS</p> */}
                    <p className="text">please enter email of new user</p>
                    <p className="text">Ask them to follow instructions in email</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                className="input-field"
                                type="email"
                                placeholder="Enter the email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                            />
                        </FormGroup>
                        <span>{errors.email}</span>
                        <div className="btn-handler">
                            <Button className="login-btn">Submit</Button>
                        </div>
                    </Form>
                </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.authReducer.islogged
});
export default connect(
    mapStateToProps,
    {  }
)(withRouter(AddUser));