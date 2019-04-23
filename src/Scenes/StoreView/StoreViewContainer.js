import React, { Component } from "react";
import StoreViewPartImage from "/src/Scenes/StoreView/StoreViewPartImage";
import helpers from "./Shared/helpers";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from "mdbreact";

export default class StoreViewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        helpers.fetchHelperWithData("getContainerData", { name: this.props.name }, partList => {
            this.setState({
                partList: partList,
                isLoading: false
            });
            //console.log(shareList);
        });
    }

    render() {
        if (this.state.isLoading) {
            return <p>Chargement...</p>;
        } else {
            return (
                <MDBCol md={this.props.width} className="lego-container">
                    {this.props.name}
                    <br />
                    {this.state.partList.map(partInfo => (
                        <StoreViewPartImage id={partInfo.RebrickableId} />
                    ))}
                </MDBCol>
            );
        }
    }
}
