import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBFormInline,
    MDBRow,
    MDBIcon,
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody
} from "mdbreact";
import CustomNavLink from "../CustomNavLink";
const CustomNavLinkWithRouter = withRouter(props => <CustomNavLink {...props} />);

export default class PageLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        const container = { height: 1300 };
        return (
            <div>
                <header>
                    <MDBNavbar color="indigo" dark expand="md" scrolling fixed="top">
                        <MDBNavbarBrand href="/">
                            <strong>BrixToRage</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.onClick} />
                        <MDBCollapse isOpen={this.state.collapse} navbar>
                            <MDBNavbarNav left>
                                <CustomNavLinkWithRouter to="/parts" name="Parts" />
                                <CustomNavLinkWithRouter to="/storage" name="Storage" />
                                <CustomNavLinkWithRouter to="/sets" name="Sets" />
                                <CustomNavLinkWithRouter to="/stats" name="Statistics" />
                            </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBNavLink to="#">
                                        <MDBIcon fab icon="facebook-f" />
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="#">
                                        <MDBIcon fab icon="twitter" />
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="#">
                                        <MDBIcon fab icon="instagram" />
                                    </MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </header>
                <MDBContainer style={container} className="text-center mt-5 pt-5">
                    {this.props.children}
                </MDBContainer>
            </div>
        );
    }
}
