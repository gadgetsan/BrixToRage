import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import StoreViewLocationCard from "/src/Scenes/StoreView/StoreViewLocationCard";
import StoreViewLocationTable from "/src/Scenes/StoreView/StoreViewLocationTable";
import { MDBCol, MDBRow } from "mdbreact";

export default class StoreViewPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const container = { height: 1300 };
        return (
            <PageLayout>
                <MDBRow>
                    <MDBCol md="6">
                        <StoreViewLocationTable />
                        <StoreViewLocationCard />
                    </MDBCol>
                </MDBRow>
            </PageLayout>
        );
    }
}
