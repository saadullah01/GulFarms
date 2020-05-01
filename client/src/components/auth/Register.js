import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Errors from '../sub_components/Errors';
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
// import logo from '../../images/logo.png';

class Register extends Component {
    // Can Add Constructor
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
        errors: {}
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    componentDidUpdate(prevprops) {
        if (prevprops.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            rePassword: this.state.rePassword
        }
        const token = window.location.href.substring( window.location.href.lastIndexOf('/') + 1)
        this.props.registerUser(newUser, this.props.history,token);
    }
    render() {
        const { errors } = this.state;
        console.log("Here: ", errors);
        return (
            <div className="home-page">
                <div className="container main">
                    <h1 className="text">GUL FARMS</h1>
                    <p className="text m-0">We are glad to have you join our team!</p>
                    <p className="text">Please fill the form below to complete the sign up process.</p>
                    <Form className="reg-form mt-3" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <div className="row">
                                <div className="col-md-6 col-xs-12">
                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        onChange={this.onChange}
                                        value={this.state.firstName}
                                        error={errors.firstName}
                                        id="firstName"
                                        className={classnames("input-field", {
                                            invalid: errors.name
                                        })}
                                    />
                                </div>
                                <div className="col-md-6 col-xs-12">
                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={this.onChange}
                                        value={this.state.lastName}
                                        error={errors.lastName}
                                        id="lastName"
                                        className={classnames("input-field", {
                                            invalid: errors.name
                                        })}
                                    />
                                </div>
                                {/* <span className="red-text">{errors.name}</span> */}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                className={classnames("input-field", {
                                    invalid: errors.email
                                })}
                            />
                            {/* <span className="red-text">{errors.email}</span> */}
                        </FormGroup>
                        <FormGroup className="password-container">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                className={classnames("input-field", {
                                    invalid: errors.password
                                })}

                            />
                            {/* <span className="red-text">{errors.password}</span> */}
                            {/* <div className="pop-up">
                                Password must be greater than 8 characters long and
                                must contain atleast 1 digit and 1 special character
                            </div> */}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                placeholder="Re-enter your password"
                                onChange={this.onChange}
                                value={this.state.rePassword}
                                error={errors.rePassword}
                                id="rePassword"
                                className={classnames("input-field", {
                                    invalid: errors.repassword
                                })}
                            />
                            {/* <span className="red-text">{errors.password}</span> */}
                        </FormGroup>
                        <div className="btn-handler">
                            <Button className="signup-btn">Sign Up</Button>
                        </div>
                    </Form>
                </div>
                <Errors errors={ errors } />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.authReducer.islogged,
    errors: state.errorReducer.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
