import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { 
    Button, 
    Form, 
    FormGroup, 
    Input
} from 'reactstrap';

class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: {}        
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userData);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">GUL FARMS</p>
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
                        <Link to="/forgot-password" className="link">Forgot Password? :(</Link>
                        <div className="btn-handler">
                            <Button className="login-btn">LOGIN</Button>
                        </div>
                    </Form>
                </div>    
            </div>
        )
    }
}

export default Login;