import React, { Component } from "react";
import PageLayout from "./Shared/Layout/PageLayout";
import StoreViewLocationCard from "./Scenes/StoreView/StoreViewLocationCard";
import StoreViewLocationTable from "./Scenes/StoreView/StoreViewLocationTable";
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
