import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import helpers from "../../Shared/helpers";
import PartListPartInfoModal from "../../Scenes/PartListView/PartListPartInfoModal";
import StoreLocEditNameModal from "../../Scenes/StoreLocView/StoreLocEditNameModal";
import PartListModalColorInfo from "../../Scenes/PartListView/PartListModalColorInfo";
import StoreViewPartImage from "../../Scenes/StoreView/StoreViewPartImage";
import update from "react-addons-update"; // ES6
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

export default class SetsPartList extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.fetchMissingPart = this.fetchMissingPart.bind(this);
    this.state = {
      loading: false,
      setData: []
    };
  }

  toggle = nr => () => {
    this.setState({
      modal: !this.state.modal
    });
    if (this.state.once || this.state.partData == null) {
      this.state.once = false;
      this.fetchData();
    }
  };

  fetchMissingPart() {
    this.setState({
      loading: true
    });
    this.state.setData.map((part, index) => {
      if (!part.Name) {
        //si la piece ne possède pas de nom, on veux la fetcher
        //console.log("Index: " + index);
        //console.dir(part);
        helpers.fetchHelperWithData(
          "getPart",
          { rebrickableId: part.RebrickableId },
          partData => {
            //Note on ne recoit pas la couleur , il faut merger les informations
            var mergedInfos = { ...part, ...partData };
            //console.dir(mergedInfos);
            var toUpdate = [];
            toUpdate[index] = { $set: mergedInfos };
            this.setState({
              setData: update(this.state.setData, toUpdate)
            });
            return;
          }
        );
        return true;
      }
    });
    this.setState({
      loading: false
    });
  }

  fetchData(cb) {
    helpers.fetchHelperWithData(
      "getSet",
      { rebrickableId: this.props.set.RebrickableId },
      setData => {
        console.dir(setData);
        this.setState({
          loading: false,
          setData: setData
        });
        if (cb && {}.toString.call(cb) === "[object Function]") {
          cb();
        }
      }
    );
  }

  render() {
    return (
      <>
        <MDBBtn
          size="sm"
          onClick={this.fetchMissingPart}
          disabled={this.state.setData.length < 1}
        >
          Fetch missing Part Info
        </MDBBtn>
        <br />
        <strong>Parts Inventory:</strong>
        <br />
        <MDBBtn size="sm" onClick={this.fetchData}>
          Load Inventory
        </MDBBtn>
        {this.state.loading ? (
          <p>loading...</p>
        ) : (
          <MDBRow>
            {this.state.setData.map(setPart => (
              <MDBCol
                md="1"
                sm="4"
                key={setPart.Id}
                style={{
                  border: "solid 1px black",
                  margin: "0px",
                  padding: "0px",
                  backgroundColor: "#" + setPart.Hex,
                  color: helpers.overlayColor(setPart.Hex)
                }}
              >
                <img className="img-fluid" src={setPart.RebrickableImageUrl} />
                <div
                  style={{
                    width: "100%",
                    fontSize: "14px",
                    textAlign: "center",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    margin: "0px",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  {setPart.Quantity}x #{setPart.RebrickableId}
                </div>
                <div
                  style={{
                    width: "100%",
                    fontsize: "10px",
                    textAlign: "center",
                    fontWeight: "bold",
                    margin: "0px"
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    fontSize: "14px",
                    textAlign: "center",
                    margin: "0px"
                  }}
                >
                  Loc.: {setPart.LocationCode}
                </div>
                <div
                  style={{
                    width: "100%",
                    fontSize: "10px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    margin: "0px"
                  }}
                >
                  {setPart.Name}
                </div>
                <PartListPartInfoModal
                  key={setPart.Id}
                  part={setPart}
                  update={this.fetchData}
                  locationUpdate={this.props.updateLocation}
                />
              </MDBCol>
            ))}
          </MDBRow>
        )}
      </>
    );
  }
}
