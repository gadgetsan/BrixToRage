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
          <MDBModalHeader toggle={this.toggle(4)}>
            Part Source validation report
          </MDBModalHeader>
          <MDBModalBody>
            Total number of Parts:<strong>12345</strong>
            <br />
            Parts From unknown Location:<strong>12345</strong>
            <br />
            Parts that should be in my collection but aren't:
            <strong>123</strong>
            <br />
            <MDBRow>
              <MDBCol
                md="3"
                sm="6"
                style={{
                  border: "solid 1px black",
                  margin: "0px",
                  padding: "0px"
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    "white-space": "nowrap",
                    margin: "0px",
                    "text-overflow": "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  24x #12345 [Technic Axle and Pin Connector Perpendicular]
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    "white-space": "nowrap",
                    margin: "0px",
                    "text-overflow": "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "rgb(160, 165, 169)"
                    }}
                  >
                    5x Light Bluish Grey
                  </span>{" "}
                  From [Tatooine Battle Pack]
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    "white-space": "nowrap",
                    margin: "0px",
                    "text-overflow": "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "rgb(228, 205, 158)"
                    }}
                  >
                    5x Tan
                  </span>{" "}
                  From [Yoda's Jedi Starfighter]
                </div>
                <div
                  style={{
                    fontSize: "10px"
                  }}
                >
                  Missing:
                  <span
                    style={{
                      backgroundColor: "rgb(228, 205, 158)"
                    }}
                  >
                    10x Tan
                  </span>{" "}
                  <span
                    style={{
                      backgroundColor: "rgb(160, 165, 169)"
                    }}
                  >
                    4x Light Bluish Grey
                  </span>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
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
