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
// import logo from '../../images/logo.png';


class ForgotPassword extends Component {
    state = {
        email: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email
        }
        console.log(userData);
        axios
            .post("/api/users/forgot-password",userData)
            .then(res => 
                window.location.href="/login"
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
                <div className="container main">
                    {/* <img src={ logo } alt={ "Logo" } /> */}
                    <p className="text-heading mb-4">GUL FARMS</p>
                    <p className="text">Forgot your password?</p>
                    <p className="text">Nothing to worry about.</p>
                    <p className="text">Enter the email you used to sign up</p>
                    <p className="text mb-3">and a password-reset link will be emailed to you.</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                className="input-field"
                                type="email"
                                placeholder="Enter your email address"
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
)(withRouter(ForgotPassword));