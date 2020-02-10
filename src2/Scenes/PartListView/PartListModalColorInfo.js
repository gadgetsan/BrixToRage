import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import helpers from "../../Shared/helpers";
import PartListPartSetLocationModal from "../../Scenes/PartListView/PartListPartSetLocationModal";
import StoreViewPartImage from "../../Scenes/StoreView/StoreViewPartImage";
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardHeader,
    MDBBtn,
    MDBCardBody,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBSelect
} from "mdbreact";

export default class PartListModalColorInfo extends Component {
    constructor(props) {
        super(props);
        this.clickfetchInfo = this.clickfetchInfo.bind(this);
    }

    clickfetchInfo(event) {
        this.props.fetchColorInfo(this.props.color.RebrickableColor);
    }

    render() {
        if (this.props.color.Name == "" || this.props.color.ColorName == undefined || this.props.color.ColorName == null) {
            return (
                <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;Color name missing ({this.props.color.Quantity}){" "}
                    <MDBBtn size="sm" onClick={this.clickfetchInfo}>
                        Fetch
                    </MDBBtn>
                    <br />
                </span>
            );
        } else {
            return (
                <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ backgroundColor: "#" + this.props.color.Hex, color: helpers.overlayColor(this.props.color.Hex) }}>
                        {this.props.color.ColorName} ({this.props.color.Quantity})
                        <br />
                    </span>
                </>
            );
        }
    }
}
