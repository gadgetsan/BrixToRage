import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import SetsSetInfoModal from "../../Scenes/SetsView/SetsSetInfoModal";
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

export default class SetsSetRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.set.RebrickableId}</td>
        <td>{this.props.set.Name}</td>
        <td>{this.props.set.isOwned ? this.props.set.quantity : "No"}</td>
        <td>
          <SetsSetInfoModal
            key={this.props.set.RebrickableId}
            set={this.props.set}
            update={this.props.update}
          />
        </td>
      </tr>
    );
  }
}
