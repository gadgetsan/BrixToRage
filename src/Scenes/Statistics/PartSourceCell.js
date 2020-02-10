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

export default class PartSourceCell extends Component {
  render() {
    return (
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
    );
  }
}
