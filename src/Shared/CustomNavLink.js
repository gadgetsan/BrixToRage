import React, { Component } from "react";
import { MDBNavItem, MDBNavLink } from "mdbreact";

export default class CustomNavLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBNavItem active={this.props.location.pathname == this.props.to}>
                <MDBNavLink to={this.props.to}>{this.props.name}</MDBNavLink>
            </MDBNavItem>
        );
    }
}
