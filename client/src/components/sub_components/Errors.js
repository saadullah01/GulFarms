import React, { Component } from "react";

class Errors extends Component {
    constructor (props) {
        super(props);
        console.log("2: ", props.errors);
        this.state = {
            errors: props.errors
        }
    }
    render() {
        const errors_list = Object.values(this.state.errors);
        const errors = errors_list.map((e) =>
            <p>{ e }</p>
        );
        // console.log("Errors: ", errors_list);
        return (
            <div class="errors">
                { errors }
            </div>
        );
    }
}

export default Errors;