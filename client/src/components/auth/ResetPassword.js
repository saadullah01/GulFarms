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

class ResetPassword extends Component {
    state = {
        password: "",
        rePassword: "",
        errors: {}        
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            password: this.state.password,
            rePassword: this.state.rePassword
        }
        const token = window.location.href.substring( window.location.href.lastIndexOf('/') + 1)
        console.log(userData);
        console.log("/api/users/reset-password/"+token)
        axios
            .post("/api/users/reset-password/"+token,userData)
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
                    <p className="text-heading mb-4">GUL FARMS</p>
                    <p className="text">Reset Password</p>
                    <p className="text mb-3">Enter your new password below</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                    <FormGroup className="password-container">
                            <Input 
                                className="input-field"
                                type="password" 
                                placeholder="Enter new password" 
                                onChange={this.onChange}
                                value={this.state.password} 
                                error={errors.password} 
                                id="password"
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                className="input-field"
                                type="password" 
                                placeholder="Confirm new password" 
                                onChange={this.onChange}
                                value={this.state.rePassword} 
                                error={errors.rePassword} 
                                id="rePassword"
                                />
                            <div className="pop-up">
                                Password must be greater than 8 characters long and
                                must contain atleast 1 digit and 1 special character
                            </div>
                        </FormGroup>
                        <div className="btn-handler">
                            <Button className="signup-btn">Confirm</Button>
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
)(withRouter(ResetPassword));