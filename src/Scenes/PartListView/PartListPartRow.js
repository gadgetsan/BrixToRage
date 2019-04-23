import React, { Component } from "react";
import PageLayout from "./Shared/Layout/PageLayout";
import PartListPartInfoModal from "./Scenes/PartListView/PartListPartInfoModal";
import StoreViewPartImage from "./Scenes/StoreView/StoreViewPartImage";
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

export default class PartListPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    <StoreViewPartImage id={this.props.part.RebrickableId} />
                </td>
                <td>
                    <a href={"https://rebrickable.com/parts/" + this.props.part.RebrickableId} target="_blank">
                        {this.props.part.RebrickableId}
                    </a>
                </td>
                <td>{this.props.part.Name}</td>
                <td>{this.props.part.TotalQuantity}</td>
                <td>{this.props.part.LocationCode}</td>
                <td className="actionCell">
                    <PartListPartInfoModal part={this.props.part} locationUpdate={this.props.locationUpdate} />
                </td>
            </tr>
        );
    }
}
