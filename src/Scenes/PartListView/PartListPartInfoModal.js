import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import helpers from "/src/Shared/helpers";
import PartListPartSetLocationModal from "/src/Scenes/PartListView/PartListPartSetLocationModal";
import PartListModalColorInfo from "/src/Scenes/PartListView/PartListModalColorInfo";
import StoreViewPartImage from "/src/Scenes/StoreView/StoreViewPartImage";
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

export default class PartListPartInfoModal extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.fetchColors = this.fetchColors.bind(this);
    this.fetchColorInfo = this.fetchColorInfo.bind(this);
    this.state = {
      modal: false,
      partData: null,
      colorData: null,
      loading: true,
      loadingColors: true,
      once: true
    };
  }

  toggle = nr => () => {
    this.setState({
      modal: !this.state.modal
    });
    if (this.state.once || this.state.partData == null) {
      this.state.once = false;
      this.fetchData();
      this.fetchColors();
    }
  };

  fetchData() {
    helpers.fetchHelperWithData(
      "getPart",
      { rebrickableId: this.props.part.RebrickableId },
      partData => {
        //console.dir(partData);
        if (this.props.update) {
          this.props.update();
        }
        this.setState({
          loading: false,
          partData: partData
        });
      }
    );
  }

  fetchColors() {
    helpers.fetchHelperWithData(
      "getColorsForPart",
      { rebrickableId: this.props.part.RebrickableId },
      colorData => {
        //console.dir(colorData);
        this.setState({
          loadingColors: false,
          colorData: colorData
        });
      }
    );
  }
  fetchColorInfo(colorId) {
    //console.log("fetching color info for: " + colorId);
    helpers.fetchHelperWithData(
      "fetchColor",
      { rebrickableId: colorId },
      colorData => {
        this.fetchColors();
      }
    );
  }

  render() {
    if (!this.state.loading) {
      var rebrickableData = JSON.parse(this.state.partData.RebrickableJSON);
    }
    return (
      <>
        <MDBBtn
          color="primary"
          size="sm"
          onClick={this.toggle(4)}
          className="actionButton"
        >
          <i className="fa fa-ellipsis-h" />
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle(4)} size="lg">
          <MDBModalHeader toggle={this.toggle(4)}>
            Information for{" "}
            {this.state.loading ? "..." : this.state.partData.Name}
          </MDBModalHeader>
          <MDBModalBody style={{ textAlign: "left" }}>
            {this.state.loading ? (
              ""
            ) : (
              <>
                <img src={rebrickableData.part_img_url} />
                <br />
              </>
            )}
            <strong>Name: </strong>{" "}
            {this.state.loading ? "..." : this.state.partData.Name}
            <br />
            <strong>Quantity: </strong> {this.props.part.TotalQuantity}
            <br />
            <strong>Years: </strong>{" "}
            {this.state.loading ? (
              "..."
            ) : (
              <span>
                {rebrickableData.year_from}-{rebrickableData.year_to}
              </span>
            )}
            <br />
            <strong>Links: </strong>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.loading ? (
              "..."
            ) : (
              <a href={rebrickableData.part_url} target="_blank">
                Rebrickable
              </a>
            )}
            <br />
            <strong>
              Available Colors:
              <br />
              {this.state.loadingColors ? (
                <p>loading...</p>
              ) : (
                this.state.colorData.map(color => (
                  <PartListModalColorInfo
                    key={color.RebrickableColor}
                    color={color}
                    fetchColorInfo={this.fetchColorInfo}
                  />
                ))
              )}
            </strong>{" "}
            <br />
            <strong>Location(s): </strong> {this.props.part.LocationCode}
            <PartListPartSetLocationModal
              rebrickableId={this.props.part.RebrickableId}
              currentLocation={this.props.part.LocationCode}
              locationUpdate={this.props.locationUpdate}
            />
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
