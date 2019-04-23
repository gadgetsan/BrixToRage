import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from "mdbreact";

export default class StoreViewPartImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <img height="25" src={"//img.bricklink.com/ItemImage/PN/1/" + this.props.id + ".png"} title={this.props.id} />;
    }
}
