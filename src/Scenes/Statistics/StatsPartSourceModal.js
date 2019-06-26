import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import helpers from "../../Shared/helpers";
import PartListPartInfoModal from "../../Scenes/PartListView/PartListPartInfoModal";
import StoreLocEditNameModal from "../../Scenes/StoreLocView/StoreLocEditNameModal";
import PartListModalColorInfo from "../../Scenes/PartListView/PartListModalColorInfo";
import SetsPartList from "../../Scenes/SetsView/SetsPartList";
import {
  MDBCol,
  MDBRow,
  MDBNav,
  MDBNavItem,
  MDBBtn,
  MDBNavLink,
  MDBIcon,
  MDBTabContent,
  MDBTabPane,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBContainer,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";

export default class StatsPartSourceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  toggle = nr => () => {
    this.setState({
      modal: !this.state.modal
    });
    if (this.state.once || this.state.partData == null) {
      this.state.once = false;
    }
  };

  render() {
    return (
      <>
        <MDBBtn
          color="primary"
          size="sm"
          onClick={this.toggle(4)}
          className="actionButton"
        >
          BUTTON
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggle(4)}
          size="lg"
          size="fluid"
        >
          <MDBModalHeader toggle={this.toggle(4)}>HEADER</MDBModalHeader>
          <MDBModalBody />
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(4)}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </>
    );
  }
}
