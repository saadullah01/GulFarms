import React, { Component } from 'react';
import {
    Label,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
} from 'reactstrap';

class Option extends Component {
    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            Opt:""

        }
    }

    submitt = () => {
        this.props.update(this.state.data)
    }
    add = e => {

        this.setState(state => {

            const data = state.data.concat(state.Opt);
            return {
                data,
            };
        }, () => this.submitt()
        );
        this.resett()

    };
    resett = () => {
        this.setState({
            Opt: "",
        });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    remove = d => {

        this.setState(state => {

            const data = state.data.filter((item, j) => d !== j)
            return {
                data,

            };
        }, () => this.submitt());
        this.resett()
    };

    display() {
        return this.state.data.map((d, index) => {
            return (

                <Row key={index}>
                    <FormGroup>
                        <Row>
                            <Col >
                                <Label className="text-label-b">{d}</Label>
                            </Col>
                            <Col>
                                <Button close onClick={() => this.remove(index)}>x</Button>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </FormGroup>

                </Row>

            );
        })
    }

    render() {
        return (
            <div>

                
                {this.submitt}
                <Row>

                    <Col>
                        <Input
                            className="input-field-ad"
                            type="text"
                            placeholder="Option"
                            onChange={this.onChange}
                            value={this.state.Opt}
                            id="Opt"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <Row>
                            <Button className="plus-btn" onClick={this.add} >+</Button>

                        </Row>
                    </Col>
                    <Col />
                </Row>
                {this.display()}
            </div>
        )
    }
}

export default Option;
