import React, { Component } from 'react';

import {
} from 'reactstrap';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            link: props.link
        }
    }
    goTo = () => {
        window.location = this.state.link;
    }
    render() {
        return (
            <div className="tab col-xs-6 col-md-2" onClick={this.goTo}>
                <p className="tab-text">{this.state.name}</p>
            </div>
        );
    }
}

export default Tab;