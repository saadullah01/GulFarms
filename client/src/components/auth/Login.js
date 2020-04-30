import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
// import logo from '../../images/logo.png';

class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    componentDidUpdate=()=> {
        if (this.props.loggedIn) {
            this.props.history.push("/home");
        }
    }
    componentDidMount=()=>{
        if(this.props.loggedIn)
        {
            this.props.history.push("/home");
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);

    }

    render(props) {
        const { errors } = this.props;

        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">GUL FARMS</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                className={classnames("input-field", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />
                        </FormGroup>
                        <span className="red-text">
                            {errors.email}
                            {errors.emailnotfound}
                        </span>
                        <FormGroup className="password-container">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                className={classnames("input-field", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
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

const mapStateToProps = state => ({
    loggedIn: state.authReducer.islogged,
    errors: state.errorReducer.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Login));