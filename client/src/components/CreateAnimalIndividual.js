import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
    UncontrolledCollapse,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { connect } from "react-redux"
import { withRouter  } from 'react-router-dom';
import { saveInstance } from "../actions/barnActions"
class CreateAnimalIndividual extends Component {

    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            AnimalName: "",
            p1: "",
            p2: "",
            errors: {},
            attributes: [{Name: "l", Type: "Options", Unit: "kg", Option:   [1,2,3], Value:""}],//From DB
            AttributesUpdate: [],
            Products: [{description: "des",
                duration: "dur" ,
                selectedOption: "Year" }],//fromm DB
            ProductsUpdate: [],
            quant: "",
            date: "",
            recordParents:true,
        }
    }
    
    componentDidMount() {
        if (this.props.farms.length <= this.ids("farm") ||
            this.props.presets.length <= this.ids("preset") ||
            this.props.barns.length <=this.ids("barn") ) {

            this.props.history.push("/home/farms/");
            return
        }
        this.setState({
            modal: true,
            AnimalName: (this.props.presets[this.ids("preset")]).name,
            p1: "",
            p2: "",
            errors: this.props.errors,
            attributes: this.mapAttributes((this.props.presets[this.ids("preset")]).attributes),//From DB
            AttributesUpdate: [],
            Products: this.mapProducts((this.props.presets[this.ids("preset")]).products),//fromm DB
            ProductsUpdate: [],
            quant: "",
            date: "",
            recordParents: (this.props.presets[this.ids("preset")]).linkParents,
        })
    }
    componentDidUpdate = (prevProps, prevState) => {
        if ((prevState.modal !== this.state.modal) ||
            (this.props.barns !== prevProps.barns)) {
            this.props.history.push("/home/farms/"+String(this.ids("farm"))+"/"+String(this.ids("preset"))+"/"+String(this.ids("barn")));
        }
    };
    mapAttributes(atts){
        const key = {
            "number":"numeric",
            "string":"string",
            "option":"options"
        }
        return (atts.map(a=>{
            if(a.name !== "parents")
            return{
                Name: a.name, 
                Type: key[a.attributeType], 
                Unit: a.unit, 
                Option:a.options, 
                Value:"",
                id: a._id
            }
        })).filter(x=>x!==undefined)
    }
    mapProducts(prods){
        return(prods.map(p=>{
            return{
            ...p,
            description: p.name
        }
    }))
    }
    ids(name) {
        const dic = {
            farm: this.props.match.params.fid,
            preset: this.props.match.params.pid,
            barn:this.props.match.params.bid
        }
        return parseInt(dic[name])
    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    onChange = ( d, index) => {
        // this.remove(index)

        // this.setState(state => {

        //     const attributes = state.attributes.concat({ Name: d.Name, Type: d.Type, Unit: d.Unit, 
        //         Option: d.Option  });
        //     return {
        //         attributes,
        //     };
        // }
        // );
    }

    onChangeProduct = ( d, index) => {
        // this.removeProduct(index)

        // this.setState(state => {

        //     const Products = state.Products.concat({ description:d.ProductDescription,
        //         duration:d.duration,
        //         selectedOption:d.selectedOption,  });
        //     return {
        //         Products,
        //     };
        // }
        // );
    }

    onAdd = e => {
        this.setState({ Products: e });
    }

    onAdd_Att = e => {
        this.setState({ attributes: e });
    }
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            AnimalName: this.state.AnimalName,
            p1: this.state.p1,
            p2: this.state.p2,
            errors: this.state.errors,
            attributes: this.state.attributes,
            Products: this.state.Products
        }
        console.log(newUser);
    }
    remove = d => {

        this.setState(state => {

            const attributes = state.attributes.filter((item, j) => d !== j)
            return {
                attributes,

            };
        });
    }
    removeProduct = d => {

        this.setState(state => {

            const Products = state.Products.filter((item, j) => d !== j)
            return {
                Products,

            };
        });
    }
    Parents() {
        if (this.state.recordParents === true) {
            return(
            <div>
                <Col>
                    <Row>
                        <Label className="h4">
                            Parents
                            </Label>
                    </Row>
                    <Row>
                        <Col>
                            <Label className="text-label">
                                Record Parents:
                            </Label>
                        </Col>
                    </Row>
                </Col>
                <Row>
                    <Col>
                        <div>
                            <Button className="plus-btn-small" id="toggler" style={{ marginBottom: '2rem' }}>
                                +
                            </Button>
                            <UncontrolledCollapse toggler="#toggler">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Input
                                                className="input-field-add"
                                                type="text"
                                                placeholder="Enter Parent 1"
                                                onChange={this.onChange}
                                                value={this.state.p1}
                                                error={this.state.errors.p1}
                                                id="p1"
                                            />
                                        </Row>
                                        <Row>
                                            <Input
                                                className="input-field-add"
                                                type="text"
                                                placeholder="Enter Parent 2"
                                                onChange={this.onChange}
                                                value={this.state.p2}
                                                error={this.state.errors.p2}
                                                id="p2"
                                            />
                                        </Row>

                                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>
                        </div>
                    </Col>
                </Row>
                <Row></Row>
                </div >
            )
        }
    }
    opt= (d,index) =>{
        
        return(
            d.Option.map((t) =>
            <DropdownItem Value={t} onClick={this.onChange(d,index)}>
                {t}
            </DropdownItem>
            )    
        )
            
        
    }
    helper=(d,index)=>{
        if(d.Type === "numeric")
        {
            return(
                <div>
                <Row>
                        <Col>
                            <Label className="text-label-b">Name</Label>
                            </Col>
                        <Col>
                            <Label className="text-label-b">Units</Label>
                        </Col>
                        <Col>
                            <Label className="text-label-b">Value</Label>
                        </Col>
                </Row>
                <Row>
                    <Col>{d.Name}</Col>
                    <Col>{d.Unit}</Col>
                    <Col><Input
                                className="input-field-heading"
                                type="text"
                                placeholder="Value"
                                onChange={this.onChange(d, index)}
                                value={d.Value}
                                id="quant"
                            />
                    </Col>
                </Row>
                </div>
            );
        }
        else if(d.Type === "string")
        {
            return(
                <div>
                <Row>
                        <Col>
                            <Label className="text-label-b">Name</Label>
                        </Col>
                        <Col>
                            <Label className="text-label-b">Value</Label>
                        </Col>
                </Row>
                <Row>
                    <Col><Label className="text-label-b">{d.Name}</Label></Col>
                    <Col><Input
                                className="input-field-heading"
                                type="text"
                                placeholder="Value"
                                onChange={this.onChange(d, index)}
                                value={d.Value}
                                id="quant"
                            />
                    </Col>
                    <Col/>
                </Row>
                </div>
                
                
            );
        }
        else if(d.Type === "options")
        {
            return(
                <div>
                <Row>
                        <Col>
                            <Label className="text-label-b">Name</Label>
                        </Col>
                        <Col>
                            <Label className="text-label-b">Options</Label>
                        </Col>
                </Row>
                <Row>
                    <Col>{d.Name}</Col>
                    <Col>
                    <div className="pl-1 pr-1 col-sm-4">
                    <UncontrolledDropdown style={{backgroundColor: "#4caf50", textAlign: "center", borderRadius: "20px"}}>
                    <DropdownToggle style={{color: "white"}} color="correct" caret>
                        {d.Value}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.opt(d, index)}
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                    </Col>
                </Row>
                </div>
                
                
            );
        }
    }
    Attributes() {
        return this.state.attributes.map((d, index) => {
            return (
                this.helper(d,index)
            );
        })
    }
    Products() {
        return this.state.Products.map((d, index) => {
            return (
                <Row>

                    <Col>
                        <Label className="text-label-b">{d.description}</Label>
                    </Col>
                    <Col>
                        <Input
                            className="input-field-heading"
                            type="date"
                            placeholder="Date"
                          //  onChange={this.onChangeProduct(d, index)}
                            value={d.Value}
                            id="date"
                        />
                    </Col>
                </Row>
            );
        })
    }
    render() {
        var modal = false
        const { errors } = this.state;
        return (
            <Modal size="lg" isOpen={this.state.modal} className="modal-dialog" align="centre" toggle={this.toggle} >
                <center>
                    <ModalHeader toggle={this.toggle} >
                        <Row>
                            <Col>
                                <Row>

                                    <Col />
                                    <Col xs="13">
                                        <h3 className="h3white" >
                                            Create New {this.state.AnimalName}
                                        </h3>
                                    </Col>


                                </Row>
                            </Col>
                        </Row>
                    </ModalHeader></center>
                <ModalBody>
                    <Container>
                        <Form className="add-farm" noValidate onSubmit={this.onSubmit}>
                            <Row>
                                <Col>

                                    <Row>
                                        <Label className="h4">
                                            Attributes:
                            </Label>
                                    </Row>
                                    <Row>
                                        <Col>{this.Attributes()}</Col>

                                    </Row>

                                    <Row>
                                        <Label className="h4">
                                            Products:
                            </Label>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {this.Products()}
                                        </Col>
                                        <Col />
                                    </Row>
                                </Col>

                                {this.Parents()}

                            </Row>
                            <Row>
                                <Button className="login-btn" onClick={this.toggle}>Save</Button>
                            </Row>
                        </Form>
                    </Container>
                </ModalBody >
            </Modal >
        )
    }
}
const mapStateToProps = state => ({
    loggedIn: state.authReducer.islogged,
    errors: state.errorReducer.errors,
    farms: state.farmReducer.farms,
    presets:state.presetReducer.presets,
    barns:state.barnReducer.barns
});
export default connect(
    mapStateToProps,
    { saveInstance }
)(withRouter(CreateAnimalIndividual))