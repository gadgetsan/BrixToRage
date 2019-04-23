import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import PartListPartRow from "/src/Scenes/PartListView/PartListPartRow";
import helpers from "./Shared/helpers";
import StoreViewPartImage from "/src/Scenes/StoreView/StoreViewPartImage";
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCardTitle,
    MDBInput,
    MDBIcon,
    MDBBtn,
    MDBFormInline,
    MDBProgress
} from "mdbreact";
import { matchPath } from "react-router";

export default class StatsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            allCount: 1,
            unsortedCount: 0
        };
    }

    componentDidMount() {
        this.fetchPartsStats();
    }

    fetchPartsStats() {
        this.setState({ isLoading: true });
        helpers.fetchHelper("getSortedPartsStats", locationsStats => {
            var totalParts = 0;
            var unsortedParts = 0;
            for (var i in locationsStats) {
                var locationData = locationsStats[i];
                totalParts += locationData.TotalQuantity;
                if (locationData.LocationCode == null) {
                    unsortedParts += locationData.TotalQuantity;
                }
            }
            this.setState({
                isLoading: false,
                allCount: totalParts,
                unsortedCount: unsortedParts
            });
            //console.dir(locationsStats);
            //console.log("totalParts: " + totalParts + " unsorted: " + unsortedParts + " " + (unsortedParts / totalParts) * 100 + "% unsorted!");
        });
    }

    render() {
        return (
            <PageLayout>
                <MDBRow>
                    <MDBCol md="12">
                        {this.state.isLoading ? (
                            "loading..."
                        ) : (
                            <MDBCard narrow>
                                <MDBCardBody cascade>
                                    <MDBCardTitle>
                                        Percentage of sorted Parts: {Math.round(((this.state.allCount - this.state.unsortedCount) / this.state.allCount) * 100)}
                                        %
                                    </MDBCardTitle>
                                    <MDBProgress value={((this.state.allCount - this.state.unsortedCount) / this.state.allCount) * 100} className="my-2" />
                                </MDBCardBody>
                            </MDBCard>
                        )}
                    </MDBCol>
                </MDBRow>
            </PageLayout>
        );
    }
}
