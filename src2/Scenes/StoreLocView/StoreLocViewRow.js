import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import StoreLocInfoModal from "../../Scenes/StoreLocView/StoreLocInfoModal";
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

export default class StoreLocViewRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.location.LocationCode}</td>
                <td>{this.props.location.Name}</td>
                <td>{this.props.location.TotalQuantity}</td>
                <td>
                    <StoreLocInfoModal location={this.props.location} update={this.props.update} />
                </td>
            </tr>
        );
    }
}
