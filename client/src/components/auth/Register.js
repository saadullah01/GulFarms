import React, { Component } from 'react';
import { 
    Button, 
    Form, 
    FormGroup, 
    Input
} from 'reactstrap';

class Register extends Component{
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

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            rePassword: this.state.rePassword
        }
        console.log(newUser);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                <div className="container main">
                    <h1 className="text">GUL FARMS</h1>
                    <p className="text m-0">We are glad to have you join our team!</p>
                    <p className="text">Please fill the form below to complete the sign up process.</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <div className="row">
                                <div className="col-md-6 col-xs-12">
                                    <Input 
                                        className="input-field"
                                        type="text" 
                                        placeholder="First Name" 
                                        onChange={this.onChange} 
                                        value={this.state.firstName} 
                                        error={errors.firstName} 
                                        id="firstName"
                                    />
                                </div>
                                <div className="col-md-6 col-xs-12">
                                    <Input 
                                        className="input-field"
                                        type="text"  
                                        placeholder="Last Name" 
                                        onChange={this.onChange} 
                                        value={this.state.lastName} 
                                        error={errors.lastName} 
                                        id="lastName"
                                    />
                                </div>
                            </div>
                        </FormGroup>
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
                        <FormGroup className="password-container">
                            <Input 
                                className="input-field"
                                type="password" 
                                placeholder="Enter your password" 
                                onChange={this.onChange}
                                value={this.state.password} 
                                error={errors.password} 
                                id="password"
                            />
                            {/* <div className="pop-up">
                                Password must be greater than 8 characters long and
                                must contain atleast 1 digit and 1 special character
                            </div> */}
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                className="input-field"
                                type="password" 
                                placeholder="Re-enter your password" 
                                onChange={this.onChange}
                                value={this.state.rePassword} 
                                error={errors.rePassword} 
                                id="rePassword"
                            />
                        </FormGroup>
                        <div className="btn-handler">
                            <Button className="signup-btn">Sign Up</Button>
                        </div>
                    </Form>
                </div>    
            </div>
        )
    }
}

export default Register;
