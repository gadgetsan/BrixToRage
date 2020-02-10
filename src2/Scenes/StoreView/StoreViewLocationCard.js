import React, { Component } from "react";
import StoreViewContainer from "./Scenes/StoreView/StoreViewContainer";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from "mdbreact";

export default class StoreViewLocationCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const container = { height: 1300 };
        return (
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>BACB</MDBCardTitle>
                    <MDBRow>
                        <StoreViewContainer width="4" name="BACB1" />
                        <StoreViewContainer width="4" name="BACB2" />
                        <StoreViewContainer width="4" name="BACB3" />
                        <StoreViewContainer width="4" name="BACB4" />
                        <StoreViewContainer width="4" name="BACB5" />
                        <StoreViewContainer width="4" name="BACB6" />
                        <StoreViewContainer width="4" name="BACB7" />
                        <StoreViewContainer width="4" name="BACB8" />
                        <StoreViewContainer width="4" name="BACB9" />
                        <StoreViewContainer width="4" name="BACB10" />
                        <StoreViewContainer width="4" name="BACB11" />
                        <StoreViewContainer width="4" name="BACB12" />
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        );
    }
}
